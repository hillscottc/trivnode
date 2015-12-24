# About

Trivia questions from a game show. 

# Build

This is a Node.js app using Express.js, Backbone.js and MongoDB.

It uses [Browserify](http://browserify.org/) to rebuild the `bundle.js` file, 
so don't forget the `npm run build` step whenever js changes are made. 

See build in the scripts section of [package.json](package.json). 

    $ npm install
    $ npm run build
    $ npm start


## Database
The db was originally created with the `load_mongo` command of the quest django app.
A backup was created using `mongodump`:

    $ mongodump --db trivnode --out dump    
 
It can be restored with `mongorestore`.

    $ mongorestore --db trivnode --drop dump/trivnode
    
Check records:

    $ mongo
    > use trivnode
    > db.clues.find()
