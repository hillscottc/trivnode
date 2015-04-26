var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );

// Connect to database
mongoose.connect('mongodb://localhost/trivnode');
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




// //Get a list of all books
// app.get('/api/books', function(request, response) {
//     return BookModel.find(function(err, books) {
//         if (!err) {
//             return response.send(books);
//         } else {
//             return console.log(err);
//         }
//     });
// });

// //Insert a new book
// app.post('/api/books', function(request, response) {
//     var book = new BookModel({
//         title: request.body.title,
//         author: request.body.author,
//         releaseDate: request.body.releaseDate,
//         keywords: request.body.keywords
//     });
//     book.save(function(err) {
//         if (!err) {
//             return console.log('created');
//         } else {
//             return console.log(err);
//         }
//     });
//     return response.send(book);
// });

// //Get a single book by id
// app.get('/api/books/:id', function(request, response) {
//     return BookModel.findById(request.params.id, function(err, book) {
//         if (!err) {
//             return response.send(book);
//         } else {
//             return console.log(err);
//         }
//     });
// });

// //Update a book
// app.put('/api/books/:id', function(request, response) {
//     console.log('Updating book ' + request.body.title);
//     return BookModel.findById(request.params.id, function(err, book) {
//         book.title = request.body.title;
//         book.author = request.body.author;
//         book.releaseDate = request.body.releaseDate;
//         book.keywords = request.body.keywords;
//         return book.save(function(err) {
//             if (!err) {
//                 console.log('book updated');
//             } else {
//                 console.log(err);
//             }
//             return response.send(book);
//         });
//     });
// });

// //Delete a book
// app.delete('/api/books/:id', function(request, response) {
//     console.log('Deleting book with id: ' + request.params.id);
//     return BookModel.findById(request.params.id, function(err, book) {
//         return book.remove(function(err) {
//             if (!err) {
//                 console.log('Book removed');
//                 return response.send('');
//             } else {
//                 console.log(err);
//             }
//         });
//     });
// });


module.exports = router;
