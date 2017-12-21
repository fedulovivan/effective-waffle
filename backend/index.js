const express = require('express');
const session = require('express-session');
const fs = require('fs');
const { get } = require('lodash/object');
const { size } = require('lodash/collection');
const { isFunction, isArray, isString } = require('lodash/lang');
const path = require('path');
const JiraClient = require('jira-connector');
const config = require('config');
const serializeError = require('serialize-error');
const bodyParser = require('body-parser');
const expressRequestId = require('express-request-id');

const {
    oauth_util: {
        getAuthorizeURL,
        swapRequestTokenWithAccessToken,
    }
} = JiraClient;

const FileStore = require('session-file-store')(session);

const app = express();

const PORT = get(config, 'backendPort');

const JIRA_DOMAIN = get(config, 'jiraHostName');

const CURRENT_HOST = `https://${get(config, 'appHostName')}`;

const PRIVATE_KEY_STRING = fs.readFileSync(
    path.resolve(__dirname, '../oauth/jira.pem'),
    'utf8'
);

const APP_CONSUMER_KEY = 'planning';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

app.use(session({
    store: new FileStore({
        ttl: get(config, 'sessionTTL')
    }),
    secret: 'effective waffle',
    resave: true,
    saveUninitialized: true,
    secure: true,
    httpOnly: true,
}));

app.use(bodyParser.json());

app.use(expressRequestId());

app.get('/', (req, res) => {
    res.send(`Welcome to "Jira Planning Tool" backend root path`);
});

app.get('/jira-connector/request-permission', (req, res, next) => {
    const params = {
        host: JIRA_DOMAIN,
        oauth: {
            consumer_key: APP_CONSUMER_KEY,
            private_key: PRIVATE_KEY_STRING,
            callback_url: `${CURRENT_HOST}/backend/jira-connector/receive-authentication-callback`,
        }
    };
    getAuthorizeURL(params, (error, oauthResponse) => {
        if (error) return res.status(401).json({ error });
        console.log({ getAuthorizeURL: oauthResponse });
        const {
            token,
            token_secret,
            url,
        } = oauthResponse;
        req.session.token = token;
        req.session.token_secret = token_secret;
        res.redirect(url);
    });
});

app.get('/jira-connector/receive-authentication-callback', (req, res, next) => {
    const {
        oauth_verifier,
    } = req.query;
    console.log({ receiveAuthenticationCallback: req.query });
    if (!oauth_verifier) {
        return res.status(401).json({ error: `no 'oauth_verifier' parameter in Jira response` });
    }
    if (oauth_verifier === 'denied') {
        return res.status(401).json({ error: `permission is denied` });
    }
    const {
        token,
        token_secret,
    } = req.session;
    const params = {
        host: JIRA_DOMAIN,
        oauth: {
            token,
            token_secret,
            oauth_verifier,
            consumer_key: APP_CONSUMER_KEY,
            private_key: PRIVATE_KEY_STRING,
        }
    };
    swapRequestTokenWithAccessToken(params, (error, token) => {
        if (error) return res.status(401).json({ error });
        console.log({ swapRequestTokenWithAccessToken: token });
        req.session.token = token;
        res.redirect(CURRENT_HOST);
        // TODO fetch from
        // https://planning-local.danateq.net/backend/jira-connector/api/myself/getMyself
    });
});

app.all(`/jira-connector/api/:object?/:method?`, async (req, res) => {

    const {
        method: requestMethod,
        id: requestId,
    } = req;

    try {

        const {
            token,
            token_secret,
        } = req.session;

        if (!token || !token_secret) {
            // TODO should be sent with 401 status
            throw new Error(`no 'token' or 'token_secret' are available in user session`);
        }

        const params = {
            host: JIRA_DOMAIN,
            oauth: {
                consumer_key: APP_CONSUMER_KEY,
                private_key: PRIVATE_KEY_STRING,
                token,
                token_secret,
            }
        };

        const client = new JiraClient(params);

        const {
            object,
            method,
        } = req.params;

        if (!object || !method) {
            throw new Error(`url should be like /jira-connector/api/:object/:method`);
        }

        const apiFunctionPath = [object, method].join('.');

        if (!isFunction(get(client, apiFunctionPath))) {
            throw new Error(`not existing jira-connector function path ${apiFunctionPath}`);
        }

        // receive params via query string for get requests,
        // and via post body for all other
        const apiParams = requestMethod === METHOD_GET ? req.query : req.body;

        console.log(`request ${requestId}: Calling API method ${apiFunctionPath}`);
        console.log(`request ${requestId}:`, { apiParams });

        const result = await new Promise((resolve, reject) => {
            client[object][method](apiParams, (error, result) => {
                if (error) return reject(error);
                if (isArray(result)) {
                    console.log(`request ${requestId}: Got array of ${result.length} items`);
                } else {
                    console.log(`request ${requestId}: Got object with ${size(result)} fields`);
                }
                resolve(result);
            });
        });

        res.json(result);

    } catch (exception) {
        console.error(`request ${requestId}: ERROR:`, exception);
        const serializedException = serializeError(exception);
        res.status(500).json({
            error: isString(exception)
                ? exception
                : get(serializedException, 'message') ||  get(serializedException, 'errorMessages.0'),
            requestId
        });
    }

});

app.listen(PORT, function() {
    console.log(`listening on ${PORT}...`);
});
