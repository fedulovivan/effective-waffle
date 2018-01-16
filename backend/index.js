const express = require('express');
const session = require('express-session');
const fs = require('fs');
const { get, pick } = require('lodash/object');
const { size, each } = require('lodash/collection');
const { isFunction, isArray, isString } = require('lodash/lang');
const path = require('path');
const JiraClient = require('jira-connector');
const config = require('config');
const serializeError = require('serialize-error');
const bodyParser = require('body-parser');
const expressRequestId = require('express-request-id');
const { oneLineTrim } = require('common-tags');
const requestIp = require('request-ip');

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
// const METHOD_POST = 'POST';
// const METHOD_PUT = 'PUT';
// const METHOD_DELETE = 'DELETE';

app.use(session({
    store: new FileStore({
        // explicitly set to 1 second to indicate
        //that this param does not applied when cookie.maxAge is set
        ttl: 1
    }),
    secret: 'effective waffle',
    name: 'effective-waffle-session-id',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 1 year
        maxAge: 1000 * 3600 * 24 * 365,
        httpOnly: true,
    }
}));

app.use(bodyParser.json());

app.use(expressRequestId());

app.use(requestIp.mw());

const ts = req => [
    (new Date()).toISOString(),
    req.clientIp,
    get(req, 'session.myself.name', 'unknown'),
    req.id,
].join(' | ').concat(' |');

const callApi = async (req, object, method) => {

    const {
        method: requestMethod,
        // id: requestId,
    } = req;

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

    const apiFunctionPath = [object, method].join('.');

    if (!isFunction(get(client, apiFunctionPath))) {
        throw new Error(`not existing jira-connector function path ${apiFunctionPath}`);
    }

    // receive params via query string for get requests,
    // and via post body for all other
    const apiParams = requestMethod === METHOD_GET ? req.query : req.body;

    console.log(ts(req), `Calling API method ${apiFunctionPath}`);
    console.log(ts(req), { apiParams });

    return new Promise((resolve, reject) => {
        client[object][method](apiParams, (error, result) => {
            if (error) return reject(error);
            if (isArray(result)) {
                console.log(ts(req), `Got array of ${result.length} items`);
            } else {
                console.log(ts(req), `Got object with ${size(result)} fields`);
            }
            resolve(result);
        });
    });

};

app.get('/', (req, res) => {
    res.send(`Welcome to "Jira Planning Tool" backend root path`);
});

app.get('/jira-connector/request-permission', (req, res) => {
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
        console.log(ts(req), { getAuthorizeURL: oauthResponse });
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

app.get('/jira-connector/receive-authentication-callback', (req, res) => {
    const {
        oauth_verifier,
    } = req.query;
    console.log(ts(req), { receiveAuthenticationCallback: req.query });
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
        console.log(ts(req), { swapRequestTokenWithAccessToken: token });
        req.session.token = token;
        callApi(req, 'myself', 'getMyself').then(({ name, displayName }) => {
            req.session.myself = {
                name,
                displayName,
            };
            req.session.snackbarMessage = `Now you are authenticated as ${displayName}`;
            console.log(ts(req), req.session.myself);
            res.redirect(CURRENT_HOST);
        });
    });
});

app.all(`/jira-connector/api/:object?/:method?`, async (req, res) => {

    const {
        // method: requestMethod,
        id: requestId,
    } = req;

    try {

        const {
            object,
            method,
        } = req.params;

        if (!object || !method) {
            throw new Error(`url should be like /jira-connector/api/:object/:method`);
        }

        const result = await callApi(req, object, method);

        res.json(result);

    } catch (exception) {
        console.error(ts(req), `ERROR:`, exception);
        const serializedException = serializeError(exception);
        res.status(500).json({
            error: isString(exception)
                ? exception
                : get(serializedException, 'message') || get(serializedException, 'errorMessages.0'),
            requestId
        });
    }

});

app.get('/session', (req, res) => {
    res.json(pick(req.session, ['myself', 'snackbarMessage']));
});

app.put('/session', (req, res) => {
    const patch = pick(req.body, ['snackbarMessage']);
    Object.assign(req.session, patch);
    res.json({});
});

app.listen(PORT, function() {
    console.log(`listening on ${PORT}...`);
});
