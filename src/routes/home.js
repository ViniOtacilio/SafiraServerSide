var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
    response.json({ message: "Server is up" });
    console.log("conectado ao banco");
});

module.exports = router;