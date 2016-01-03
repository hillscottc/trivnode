var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var random = require('mongoose-simple-random');


// Connect to database
mongoose.connect('mongodb://localhost/trivnode');

//// Using a docker image mongo
//var address = process.env.MONGODB_PORT_27017_TCP_ADDR;
//var port = process.env.MONGODB_PORT_27017_TCP_PORT;
//mongoose.connect("mongodb://" + address + ":" + port + "/trivnode");


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to Mongo.")
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


// GET all clues /api/clues/
router.get('/clues/', function(request, response) {
    //return Clue.find(function(err, clues) {
    return Clue.find().exec(function (err, clues) {
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
