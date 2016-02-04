var express = require('express'),
    router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { site_name: 'TrivNode' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { site_name: 'TrivNode' });
});

router.get('/cats', function(req, res, next) {
  res.render('cats', { site_name: 'TrivNode' });
});

module.exports = router;
