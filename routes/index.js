var express = require('express');
var Remarkable = require('remarkable');
var request = require('request')
var md = new Remarkable();
var router = express.Router();

var base = "http://zucchinize.epsilon.bysh.me/notes/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:category/:name', function(req, res) {
  var url = base + req.params.category + 'x-' + req.params.name + '.txt';
  request(url, function(err, resp, body) {
    res.render('note', { title: req.params.name, markdown: md.render(body) });
  });
});

module.exports = router;
