var dateFormat = require('dateformat');

function getCurrentTime()
{
    var curDate = new Date();
    var unix = Math.floor(curDate/1000) * 1000;
    var sqlDate = dateFormat(unix, "yyyy-mm-dd H:MM:ss");
    
    return {date:curDate,sql:sqlDate,ts:unix}
}


exports.getCurrentTime = getCurrentTime;