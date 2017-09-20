var config = require('./conf/config.json');

var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();

var context = require('./lib/context');
var bodyParser = require('body-parser');

var winston = require('winston'),
    expressWinston = require('express-winston');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: false,
          colorize: true
        }),
        new winston.transports.File({ filename: 'log/access.log' })
      ],
      meta: false,
      msg:"[{{new Date(Date.now()).toUTCString()}}] ACCESS -- {{req.ip}} \"{{req.headers['user-agent']}}\" {{req.protocol}} {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms"
    }));

app.use(require('./ws'));

var httpServer = http.createServer(app);

httpServer.listen(config.service.port);
console.log('[' + new Date(Date.now()).toUTCString() + '] SERVER -- HTTP Listening on port ' + config.service.port);
