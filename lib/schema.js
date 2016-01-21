var debug = require('debug')('trivnode:schema'),
    printf = require('printf'),
    mongoose = require( 'mongoose'),
    random = require('mongoose-simple-random'),
    config = require('config'),
    shuffle = require('./common').shuffle;


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


// Define Clue schema
var clueSchema = new mongoose.Schema({
    question: String,
    answer: String,
    category: String
});

// Use plugin for simple random queries
clueSchema.plugin(random);

// Map mongo Clue model to schema
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

module.exports.Clue = Clue;
module.exports.getRandomCats = getRandomCats;

