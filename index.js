import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './global'
import './schedule/allSchedule'
import './component/ga/ga4Traffic.js'
import oauthRouter from './routes/oauthRouter.js'
import gaRouter from './routes/gaRouter.js'
import youtubeRouter from './routes/youtubeRouter.js'

const app = express();
const http = require('http').Server(app);
const host = '0.0.0.0';
const port = config.prod.port;

app.use(bodyParser.json());
app.set("views", "views/");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static('public')); //靜態檔案放置區
app.use('/', oauthRouter);
app.use('/ga', gaRouter);
app.use('/youtube', youtubeRouter);

http.listen(port, host, function() {
    console.log("Server started on " + port);
});