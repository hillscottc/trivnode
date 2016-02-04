var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var bookshelf = require('bookshelf')(knex);

var Klue = bookshelf.Model.extend({
  tableName: 'clue'
});


module.exports.Klue = Klue;