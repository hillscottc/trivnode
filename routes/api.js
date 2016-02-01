var express = require('express'),
    router = express.Router(),
    getKlues = require('../database/pg_schema').getKlues,
    Clue = require('../database/schema').Clue,
    Klue = require('../database/pg_schema').Klue;


// GET /api page.
router.get( '/', function(request, response ) {
  response.render('api', { site_name: 'TrivNode' });
});







// GET /api/klues -- first 5 klues
router.get('/klues', function(req, res) {

  Klue.query(function(qb) {
        qb.offset(0).limit(5);
      })
      .fetchAll()
      .then(function(klues) {
        res.json(klues);
        //res.render(klues);
      });
});





//// GET /api/klues/ -- top 1000 klues
//router.get('/klues/', function(req, res) {
//  getKlues(function(err, results) {
//    if(err) {
//      console.log(err);
//      return res.status(500).json({ success: false, data: err});
//    } else {
//      res.json(results);
//    }
//  });
//});



// GET /api/clues/ -- top 1000 clues
router.get('/clues/', function(request, response) {
  //return Clue.find(function(err, clues) {
  return Clue.find().limit(1000).exec(function (err, clues) {
    if (!err) {
      return response.send(clues);
    } else {
      return console.log(err);
    }
  });
});


// GET  /api/clues/r/  -- random clues with optional limit
router.get('/clues/r/:limit?', function(request, response) {
  var limit = request.params.limit;
  if (!limit) {
    limit = 100;  // default
  }
  return Clue.findRandom({}, {}, {limit: limit}, function(err, clues) {
    if (!err) {
      return response.send(clues);
    } else {
      return console.log(err);
    }
  });
});



// GET  /api/cats/r/  -- random categories with optional limit
router.get('/cats/r/:limit?', function(request, response) {
  var limit = request.params.limit;
  if (!limit) {
    limit = 10;  // default
  }

  return Clue.getRandomCats(limit, function(err, cats) {

    if (!err) {
      return response.send(cats);
    } else {
      return console.log(err);
    }
  });

});


// GET single clue by id /api/clues/{id}
router.get('/clues/:id', function(request, response) {
  return Clue.findById(request.params.id, function(err, clue) {
    if (!err) {
      return response.send(clue);
    } else {
      return console.log(err);
    }
  });
});

module.exports = router;
