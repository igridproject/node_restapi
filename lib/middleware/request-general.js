var context = require('../context');
var conf = context.config;

/*
 * checking for ...
 * 
 * User-Agent,Date,
 * 
 */

var middlew = function(req, res, next) {
    next();
}

module.exports.middleware = middlew;