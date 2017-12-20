const express = require('express');
const session = require('express-session');
const fs = require('fs');
const { OAuth } = require('oauth');
const { get } = require('lodash/object');
const path = require('path');

const app = express();

const PORT = 1337;

const CURRENT_HOST = 'https://planning-local.danateq.net';

const BASE_JIRA_URL = 'https://jira.danateq.net';

const PRIVATE_KEY_STRING = fs.readFileSync(path.resolve(__dirname, '../oauth/jira.pem'), 'utf8');

const CONSUMER_KEY = 'planning';

const CALLBACK_URL = `${CURRENT_HOST}/backend/jira/callback`;

const OAUTH_AUTH_TOKEN = 'FNw9XepMra1e2RvKFzbauC2bCeohWaB5';

const OAUTH_TOKEN_SECRET = 'wJ2MkGjZFub0NrRnEsWRw6i8rGwjmye3';

app.use(session({
    secret: 'red',
    resave: false,
    saveUninitialized: false,
}));

app.get('/jira', function (req, res) {
    const oa = new OAuth(
        `${BASE_JIRA_URL}/plugins/servlet/oauth/request-token`,
        `${BASE_JIRA_URL}/plugins/servlet/oauth/access-token`,
        CONSUMER_KEY,
        PRIVATE_KEY_STRING,
        '1.0',
        CALLBACK_URL,
        'RSA-SHA1'
    );
    oa.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret) {
        if (error) {
            console.log(error.data);
            res.send('Error getting OAuth access token');
        } else {
            req.session.oa = oa;
            req.session.oauth_token = oauthToken;
            req.session.oauth_token_secret = oauthTokenSecret;
            return res.redirect(`${BASE_JIRA_URL}/plugins/servlet/oauth/authorize?oauth_token=${oauthToken}`);
        }
    });
});

app.get('/jira/callback', function (req, res) {

    const sessionOa = get(req, 'session.oa');

    if (!sessionOa) {
        return res.send(`no session data available`);
    }

    const {
        _requestUrl,
        _accessUrl,
        _consumerKey,
        _version,
        _authorize_callback,
        _signatureMethod,
    } = sessionOa;

    const oa = new OAuth(
        _requestUrl,
        _accessUrl,
        _consumerKey,
        PRIVATE_KEY_STRING,
        _version,
        _authorize_callback,
        _signatureMethod
    );

    oa.getOAuthAccessToken(
        req.session.oauth_token,
        req.session.oauth_token_secret,
        req.param('oauth_verifier'),
        function (error, oauth_access_token, oauth_access_token_secret, results2) {
            if (error) {
                console.log('error');
                console.log(error);
            } else {
                // store the access token in the session
                req.session.oauth_access_token = oauth_access_token;
                req.session.oauth_access_token_secret = oauth_access_token_secret;
                res.send({
                    message: 'successfully authenticated.',
                    access_token: oauth_access_token,
                    secret: oauth_access_token_secret
                });
            }
        }
    );
});

app.get('/projects', function (req, res) {
    const consumer = new OAuth(
        `${BASE_JIRA_URL}/plugins/servlet/oauth/request-token`,
        `${BASE_JIRA_URL}/plugins/servlet/oauth/access-token`,
        CONSUMER_KEY,
        PRIVATE_KEY_STRING,
        '1.0',
        CALLBACK_URL,
        'RSA-SHA1'
    );
    function callback(error, data, resp) {
        if (error) console.error(error);
        //console.log('data,', data, 'error,', error);
        return res.send(data);
    }
    consumer.get(
        `${BASE_JIRA_URL}/rest/api/2/project`,
        OAUTH_AUTH_TOKEN,
        OAUTH_TOKEN_SECRET,
        callback
    );
});

app.listen(PORT, function () {
    console.log(`listening on ${PORT}...`);
});
