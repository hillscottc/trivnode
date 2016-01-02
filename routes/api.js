var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );

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


var Clue = mongoose.model('Clue', clueSchema);


// GET /api page.
router.get( '/', function(request, response ) {
    response.render('api', { site_name: 'TrivNode' });
});


// GET /api/clues
router.get('/clues/', function(request, response) {
    return Clue.find(function(err, clues) {
        if (!err) {
            return response.send(clues);
        } else {
            return console.log(err);
        }
    });
});


// GET a single clue by id
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
