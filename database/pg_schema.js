var pg = require('pg');



var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: false
  //ssl: true
});


var bookshelf = require('bookshelf')(knex);

var Klue = bookshelf.Model.extend({
  tableName: 'questapp_clue'
});



function getKlues(callback){
  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      callback(err, null);
    }

    // SQL Query > Select Data
    var query = client.query(
        "SELECT id, category, question FROM questapp_clue ORDER BY id ASC LIMIT 1000;");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      callback(null, results);
    });

  });
}

module.exports.getKlues = getKlues;
module.exports.Klue = Klue;