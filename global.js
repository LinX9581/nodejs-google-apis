import config from './config.js'
import query from './mysql-connect.js'
import moment from 'moment'
import schedule from 'node-schedule'
import fs from 'fs'
import _ from 'lodash'

global.config = config
global.query = query
global.moment = moment
global.schedule = schedule
global.fs = fs
global._ = _