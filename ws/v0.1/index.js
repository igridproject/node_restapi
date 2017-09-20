var express = require('express');
var router = express.Router();

router.use('/example',require('./service-example'));


module.exports = router;
