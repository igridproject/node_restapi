var context = require('./context');


module.exports.create = create;

function create(data,param)
{
    if(data && Array.isArray(data))
    {
        var pg = new pagination(data,param);
        return pg;
    }else{
        return null;
    }
}

var pagination = function(data,param)
{
    this.perpage = 100;
    if(param){
       if(param.perpage && param.perpage>0){this.perpage = param.perpage;}  
    }
    
    this.data = data;
    //this.pages = chunk(data,this.perpage);
}


//function chunk(arr, chunkSize) {
//  var R = [];
//  for (var i=0,len=arr.length; i<len; i+=chunkSize)
//    R.push(arr.slice(i,i+chunkSize));
//  return R;
//}
//
//pagination.prototype.getPages = function(){ 
//    return chunk(this.data,this.perpage);
//}

pagination.prototype.page = function(no){
    if(no && no>0){
        var start = (no-1) * this.perpage;
        return this.data.slice(start,start+this.perpage);
    }else{
        return this.data.slice(0,this.perpage);
    }
}

pagination.prototype.count = function(){ 
    return Math.ceil(this.data.length / this.perpage);
}

