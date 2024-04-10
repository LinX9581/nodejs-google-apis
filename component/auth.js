const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);

// 需在GCP上建立Oauth取得
let clientSecret = config.googleOauth.clientSecret;
let clientId = config.googleOauth.clientId;
let redirectUrl = config.googleOauth.redirectUrl;
let oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
const scopes = [
    'https://www.googleapis.com/auth/youtube',  // YT
    'https://www.googleapis.com/auth/webmasters',  // Search Console
    'https://www.googleapis.com/auth/webmasters.readonly',  // Search Console
    'https://www.googleapis.com/auth/adwords'  // AD
];

// Refresh Token 期限為180天 過期需重登重新取得
app.get('/', function(req, res) {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: 'consent',  // 可以強制取得Refresh Token 避免被快取
        scope: scopes,
    });
    res.redirect(url);
});

// 登入後 redirect 到這並取得 refresh token
app.get('/oauth', async function(req, res) {
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
        fs.mkdirSync('/root/.credentials/');
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile('/root/.credentials/oauth.json', JSON.stringify(tokens), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + '/root/.credentials/oauth.json');
    });
}

const host = '0.0.0.0';
const port = process.env.PORT || 3019;

http.listen(port, host, function() {
    console.log("Server started.......");
});


// NOTE
/*
## 第一次授權才能拿到refresh token
超過第一次要先拔掉帳戶授權
https://myaccount.google.com/permissions

## 設定 access_type: "offline" 'consent', 
參考
https://stackoverflow.com/a/65108513/9404956
const url = oauth2Client.generateAuthUrl({
    access_type: "offline", # offline才拿的到token
    prompt: 'consent',      # 強制讓使用者允許YT權限
    scope: scopes,
});
*/