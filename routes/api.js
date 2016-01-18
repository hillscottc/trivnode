var util = require('util'),
    express = require('express'),
    router = express.Router(),
    mongoose = require( 'mongoose'),
    random = require('mongoose-simple-random'),
    config = require('config');

// Connect to Mongo
console.log("NODE_ENV=" + config.util.getEnv('NODE_ENV'));
var connStr;
var mongoConfig = config.get('mongo');
if (config.util.getEnv('NODE_ENV') === 'development') {
  connStr = util.format('mongodb://%s:%s/%s', mongoConfig.host, mongoConfig.port, mongoConfig.dbName);
} else {
  connStr = util.format('mongodb://%s:%s@%s:%s/%s',
      mongoConfig.user, mongoConfig.password, mongoConfig.host, mongoConfig.port, mongoConfig.dbName);
}

mongoose.connect(connStr);

//// Using a docker image mongo
//var address = process.env.MONGODB_PORT_27017_TCP_ADDR;
//var port = process.env.MONGODB_PORT_27017_TCP_PORT;


var db = mongoose.connection;
console.log("Connecting to " + mongoConfig.host + "...");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to Mongo.");
});

var clueSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String
});

clueSchema.plugin(random);

var Clue = mongoose.model('Clue', clueSchema);

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
    limit = 100;  // default max random records
  }
  return Clue.findRandom({}, {}, {limit: limit}, function(err, clues) {
    if (!err) {
      return response.send(clues);
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
