var context = require('../../lib/context');

var express = require('express');
var router = express.Router();

var middware = context.getlib('request-general').middleware;
var response = context.getlib('response');
var request = context.getlib('request');

router.get('/',middware,function (req, res) {
    var reqHelper = request.create(req);
    var respHelper = response.create(res);
    
    respHelper.responseOK({'msg':'Hello'});
	
})


router.get('/:id',middware,function (req, res) {
    
    var reqHelper = request.create(req);
    var respHelper = response.create(res);
    var inputId = req.params.id;
    
    
	respHelper.responseOK({'id':inputId});
})



module.exports = router;