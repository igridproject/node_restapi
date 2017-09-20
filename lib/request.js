var context = require('./context');
var conf = context.config

var dateFormat = require('dateformat');

module.exports.create = create;

function create(req)
{
    if(req)
    {
        var rqhp = new requestHelper(req);
        return rqhp;
    }else{
        return null;
    }
}

var requestHelper = function(req)
{
    this.request= req;
}

//var getBaseLink = function() {
//    var bHostname = this.request.protocol + '://' + this.request.get('host');
//    if(conf.service.baseHostname){
//        bHostname = this.request.protocol + '://' + conf.service.baseHostname;
//    }
//    var fullUrl = bHostname + this.request.baseUrl;
//    return fullUrl;
//};

requestHelper.prototype.getRequest = function() {
    return this.request;
};
requestHelper.prototype.getHeaders= function() {
    return this.request.headers;
};
requestHelper.prototype.getQuery = function() {
    return this.request.query;
};
requestHelper.prototype.getBaseLink = function() {
    var bHostname = this.request.protocol + "://" ;
    if(conf.service.baseHostname){
        bHostname = bHostname + conf.service.baseHostname;
    }else{
        bHostname = bHostname + this.request.get('host');
    }
    
    var fullUrl = bHostname + this.request.baseUrl;
    return fullUrl;
};
requestHelper.prototype.getPagination = function() {
    var bHostname = this.request.protocol + "://" ;
    if(conf.service.baseHostname){
        bHostname = bHostname + conf.service.baseHostname;
    }else{
        bHostname = bHostname + this.request.get('host');
    }
    
    return {
            page:(this.request.query.page)?Number(this.request.query.page):null,
            perpage:(this.request.query.per_page)?Number(this.request.query.per_page):null,
            baselink:bHostname + this.request.baseUrl,
            query:this.request.query
        };
};

requestHelper.prototype.ifModifiedSince = function(format) {
    var modsince =  this.request.headers['if-modified-since'];
    if(!modsince){return null;}
    
    if(!format){
        return {
            ts : Date.parse(modsince),
            http : modsince,
            sql : dateFormat(modsince, "yyyy-mm-dd H:MM:ss")
        }
    }else if(format == 'ts'){
        return Date.parse(modsince);
    }
};

requestHelper.prototype.ifUnModifiedSince = function(format) {
    var modsince =  this.request.headers['if-unmodified-since'];
    if(!modsince){return null;}
    
    if(!format){
        return {
            ts : Date.parse(modsince),
            http : modsince,
            sql : dateFormat(modsince, "yyyy-mm-dd H:MM:ss")
        }
    }else if(format == 'ts'){
        return Date.parse(modsince);
    }
};