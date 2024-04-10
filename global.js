import config from './config'
global.config = config
global.query = require('./mysql-connect.js')
global.moment = require('moment')
global.schedule = require('node-schedule')
global.fs = require('fs')
global._ = require('lodash')