var debug = require('debug')('trivnode:api'),
    printf = require('printf'),
    express = require('express'),
    router = express.Router(),
    mongoose = require( 'mongoose'),
    random = require('mongoose-simple-random'),
    config = require('config'),
    shuffle = require('../common').shuffle;


debug("NODE_ENV=" + config.util.getEnv('NODE_ENV'));

// Connect to Mongo
//var connStr = 'mongodb://localhost/trivnode';
var connStr = printf('mongodb://%(user)s:%(password)s@%(host)s:%(port)s/%(dbName)s', config.get('mongo'));
mongoose.connect(connStr);

var db = mongoose.connection;
debug("Connecting to " + config.get('mongo.host') + "...");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  debug("Connected to Mongo.");
});

var clueSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String
});

clueSchema.plugin(random);

var Clue = mongoose.model('Clue', clueSchema);



/**
 * Get random clue categories.
 * @param limit
 * @param callback
 */
function getRandomCats(limit, callback) {
  return Clue.findRandom({}, {}, {limit: 1000}, function(err, clues) {
    // cats are a hash keyed by category, for uniqueness
    var catHash = {};
    for (var i= 0;i<clues.length; i++) {
      catHash[clues[i].category] = 1;
    }
    var cats = Object.keys(catHash);
    cats = shuffle(cats);
    callback(err, cats.slice(0, limit));
  });
}




// GET /api page.
router.get( '/', function(request, response ) {
  response.render('api', { site_name: 'TrivNode' });
});





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

  return getRandomCats(limit, function(err, cats) {

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
