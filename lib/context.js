var libidx = [];

//request
libidx['request-general'] = "./middleware/request-general";

//helper
libidx['request'] = "./request";
libidx['response'] = "./response";

//Pagination
libidx['pagination'] = "./pagination-fast";

//configulation
var CONFIG_PATH = '../conf/config.json';

libidx['utils'] = "./utils";


exports.getlib = function(name){
    if(libidx[name])
    {
        return require(libidx[name]);
    }
    return null;  
}

var cfg = require(CONFIG_PATH);
exports.config = cfg;


