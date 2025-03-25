# Nodejs Google Api Template

## Note
* Google Analytics 4
* Google Sheet
* Google Youtube
* BigQuery

## Start
git clone https://github.com/LinX9581/nodejs-googleApis  
cd nodejs-googleApis  
yarn install  
mv config-sample.js config.js (Set Google Credentials)  
yarn start  

add GOOGLE_CLIENT_EMAIL to ga and sheet viewer permissions  

* tree  
```
./api                     // ga4 sheet youtube search-console auth API  
./routes/allSchedule.js   // all schedule  
./component               // api sample
./route                   // ga oauth youtube router  
```

## GA4

* test  
curl http://127.0.0.1:4004/ga/ga4/{ga4_view_id}/{start_date}/{end_date}/{dimensions}/{metrics}  
curl http://127.0.0.1:4004/ga/ga4/274947839/2024-04-03/2024-04-05/date/screenPageViews,newUsers  

* Metrics & Dimensions  
https://developers.google.com/analytics/devguides/reporting/core/v4/advanced
https://support.google.com/analytics/answer/11242841?hl=en#zippy=%2Cin-this-article

* Online Query  
https://ga-dev-tools.appspot.com/query-explorer/
https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/

* 常用 Dimensions  
pageTitle
sessionSourceMedium
sessionMedium 
sessionSource
unifiedScreenName     // realtime pageTitle

* 常用 Metrics  
screenPageViews
activeUsers
newUsers
userEngagementDuration

* Realtime data metrics  
https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema

* Nodejs  
https://7nohe-tech-blog.vercel.app/post/node-js-google-analytics-4-ga4-contentful-google-analytics-data-api
https://googleapis.dev/nodejs/analytics-data/latest/
https://stackoverflow.com/users/14466144/brett

* rest api -> ./routes/index-router.js  
https://dns.sample.com/ga4/308596645/2022-10-25/2022-10-30/date/screenPageViews

* Request Body  
[Official Document]
(https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports)

```
property: `properties/${propertyId}`,
dimensions: [
  {
    name: 'date',
  },
],
metrics: [
  {
    name: 'activeUsers',
  },
  {
    name: 'newUsers',
  },
],
dateRanges: [
  {
    startDate: '7daysAgo',
    endDate: 'today',
  },
],
dimensionFilter: {
  filter: {
    fieldName: "firstUserSource",
    stringFilter: { matchType: "CONTAINS", value: 'google', caseSensitive: false }
  }
},
orderBys: [
  {
    metric: {
      metricName: 'totalRevenue',
    },
    desc: true,
  },
],
```

## Bigquery
* test  
./component/bigquery/bigquery.js

## Sheet
* test  
./component/gs/sheetSample.js

## Oauth
1. Configure Consent Screen
GCP -> APIs & Services -> Credentails 
Configure Consent Screen -> App Name -> User Support Email -> External -> Save

2. Create OAuth client ID
Create OAuth client ID -> Web application  
Input name , subdomain , subdomain/oauth , save  

3. Input clientId clientSecret to config.js  
```
  googleOauth: {
    clientSecret: "",
    clientId: "",
    redirectUrl: "test.com/oauth",
  },
```

4. Get Credentails token  
brower subdomain & using test account login google account to get token  
token will be saved to /root/.oauth/oauth.json  
  
5. Scopes choose what you want  
```
const scopes = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/bigquery'
];
```

6. Enable API
YouTube Data API v3

## Youtube Note

* test
```
curl --location 'https://{oauth_domain}/youtube/getVideo' \
--header 'Content-Type: application/json' \
--header 'authorization: test' \
--data '{
    "videoId": "youtube_id"
}'
```

* Quota  
read list 1 unit  
Create Update Delete 50 unit  
search 100  
Insert 1600 unit  
total unit = 10000  

* ref  
[youtube api document](https://developers.google.com/youtube/v3/docs)  
[other](https://www.pexels.com/zh-tw/search/videos/%E8%BE%A6%E5%85%AC%E5%AE%A4/)  
[nodejs oauth api ref](https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/S1eYdtA1P)  

## BiqQuery Note
* Samples  
https://github.com/googleapis/nodejs-bigquery/tree/main/samples  