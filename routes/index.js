var express = require('express');
var Remarkable = require('remarkable');
var request = require('request')
var md = new Remarkable();
var router = express.Router();

var base = "http://zucchinize.epsilon.bysh.me/notes/";

/* GET home page. */
router.get('/', function(req, res) {
  var category = /.+?(?=x-)/
  var name = /(?=x-)(.*?)(?=\.)/
  var notes = []
  request(base + 'json.php', function(err, resp, body) {
    var json = JSON.parse(body)
    for (var i = 0; i < json.length; i++) {
      var note = {
        url: json[i].match(name)[0].substring(2),
        name: json[i].match(name)[0].substring(2).replace(/-/g, ' '),
        category: json[i].match(category)[0]
      };
      note.slug = note.category + '/' + note.url
      notes.push(note)
    }
    res.render('index', { notes: notes })
  });
});

router.get('/todo', function(req, res) {
  request(base + 'todo.txt', function(err, resp, body) {
    res.render('note', { title: 'todo', markdown: md.render(body) });
  });
});

router.get('/:category/:name', function(req, res) {
  var url = base + req.params.category + 'x-' + req.params.name + '.txt';
  request(url, function(err, resp, body) {
    res.render('note', { title: req.params.name, markdown: md.render(body) });
  });
});

module.exports = router;
