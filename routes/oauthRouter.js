import fs from 'fs'
import { google } from 'googleapis'
import express from 'express'

const router = express.Router();
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.googleOauth.clientId, config.googleOauth.clientSecret, config.googleOauth.redirectUrl);
const scopes = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/bigquery'
];

router.get('/', function(req, res) {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: 'consent',
        scope: scopes,
    });
    res.redirect(url);
});

// If no get Refresh Token
// remove oauth from https://myaccount.google.com/permissions
// re login
router.get('/oauth', async function(req, res) {
    console.log(req.query.code);
    if (req.query.code) {
        const { tokens } = await oauth2Client.getToken(req.query.code)
        oauth2Client.setCredentials(tokens);
        storeToken(tokens)
        res.send('200');
    }
})

function storeToken(tokens) {
    try {
        fs.mkdirSync('/root/.oauth/');
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile('/root/.oauth/oauth.json', JSON.stringify(tokens), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + '/root/.oauth/oauth.json');
    });
}

export default router;