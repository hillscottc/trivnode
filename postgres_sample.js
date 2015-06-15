/* Demonstrates using a Posgres db instead of Mongo.
 */


var conString = "postgres://quest_acct:12345@localhost/quest_db";


/* Uses [node-postgres](https://github.com/brianc/node-postgres), for typical SQL access.
 */


var pg = require('pg');

// Connect a single client run queries, disconnect.
var client = new pg.Client(conString);
client.connect(function(err) {
    console.log('Executing postgres query.');

    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();
    });
});


// Starts a connection pool keeping idle connections open for a (configurable) 30 seconds
pg.connect(conString, function(err, client, done) {
    console.log('Starting postgres connection pool.');

    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
});





/* Or, use bookshelf.js for an ORM interface to postgres.
 */

var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        user     : 'quest_acct',
        password : '12345',
        database : 'quest_db',
        charset  : 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

var Clue = bookshelf.Model.extend({
    tableName: 'questapp_clue'
});


new Clue({id: 1}).fetch().then(function(model) {
    //JSON.stringify(model);
    console.log(model.toJSON());
});

