# About

A Node.js app using [Express 4](http://expressjs.com/).

It uses [Browserify](http://browserify.org/) to rebuild the `bundle.js` file, 
so don't forget the `npm run build` step whenever js changes are made. 

See build in the scripts section of [package.json](package.json). 


# Build

    $ npm install
    $ npm run build
    $ npm start


## Database
I fill the db using the load_mongo command of the quest django app.

    $ mongo
    > use trivnode
    > db.clues.find()
    
