# About

Trivia questions from a game show. 

# Build

    $ npm install
    $ npm run build
    $ npm start

## Components

This is a single-page application in [Node](https://nodejs.org/). 
The layout is a responsive [Bootstrap](http://getbootstrap.com/) template.

The web application framework is [Express.js](http://expressjs.com/), handling request routing 
and html template rendering ([Handlebars.js](http://handlebarsjs.com/)). 

The main web application is structured with [Backbone.js](http://backbonejs.org/). It is primarily used primarily 
to implement the app's fast 'as-you-type' search filter of 1,000 rows of clues on the main page. 

[Browserify](http://browserify.org/) is used to bundle the app's javascript modules, 
so it is necessary to run `npm run build` whenever js changes are made. 


## API
The api provides question data from the db, called 'clues'. Two basic GET functions are provided:

From [routes/api.js](routes/api.js) :

    // GET all clues /api/clues/
    router.get('/clues/', function(request, response) {
        return Clue.find(function(err, clues) {
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

## Database
The db was originally created with the `load_mongo` command of the quest django app.
A backup was created using `mongodump`:

    $ mongodump --db trivnode --out dump    
 
It can be restored with `mongorestore`.

    $ mongorestore --db trivnode --drop dump/trivnode
    

## Docker

Pull the latest mongo image from dockerhub.

    $ docker pull mongo:latest

Create a new container from the mongo image and name it "mongodb" exposing port 27017. 


By default, mongo saves the data inside the container at /data/db
Use the -v option to link local /var/mongodb to /data/db inside the container. 

    $ sudo mkdir -p /var/mongodb
    $ docker run -itd -p 27017 -v /var/mongodb:/data/db --name mongodb mongo


Build the app's container

    $ docker build -t hillscottc/trivnode .

Bash into it, to check stuff:

    $ docker run -it -P --link mongodb:mongodb hillscottc/trivnode bash

Daemonized:

    $ docker run -itd -P --link mongodb:mongodb hillscottc/trivnode bash

