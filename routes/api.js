var express = require('express'),
    router = express.Router(),
    pg = require('pg');


// GET /api page.
router.get( '/', function(request, response ) {
  response.render('api', { site_name: 'TrivNode' });
});


// GET /api/clues -- 100 RANDOM clues
router.get('/clues', function(req, res) {
  var results = [];
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    // join with category name
    var query = client.query(
        "SELECT a.category_name AS category, b.question, b.answer FROM clue AS b " +
        "JOIN category AS a ON a.category_id = b.category_id ORDER BY random() LIMIT 100;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


// GET /api/cats -- 20 RANDOM categories
router.get('/cats', function(req, res) {
  var results = [];
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("SELECT * FROM category ORDER BY random() LIMIT 20;");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});


/*
'Clue' using the mongo data. Deprecating.
 */


//
//
//
//// GET  /api/cats/r/  -- random categories with optional limit
//router.get('/cats/r/:limit?', function(request, response) {
//  var limit = request.params.limit;
//  if (!limit) {
//    limit = 10;  // default
//  }
//
//  return Clue.getRandomCats(limit, function(err, cats) {
//
//    if (!err) {
//      return response.send(cats);
//    } else {
//      return console.log(err);
//    }
//  });
//
//});
//
//
//// GET single clue by id /api/clues/{id}
//router.get('/clues/:id', function(request, response) {
//  return Clue.findById(request.params.id, function(err, clue) {
//    if (!err) {
//      return response.send(clue);
//    } else {
//      return console.log(err);
//    }
//  });
//});

module.exports = router;
