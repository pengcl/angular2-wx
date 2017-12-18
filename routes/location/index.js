var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/:location', function (req, res, next) {
  request("http://apis.map.qq.com/ws/geocoder/v1/?location=" + req.params.location + "&key=PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;
