var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  request("http://sell.yfq.cn/product/getProList.ht?activeTag=ljzma", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

router.get('/:productId', function (req, res) {
  request("http://sell.yfq.cn/product/getProDetial.ht?productId=" + req.params.productId + "&activeTag=ljzma", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;
