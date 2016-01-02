# About

Trivia questions from a game show. 

This is a single-page application in [Node](https://nodejs.org/). 
The layout is a responsive [Boostrap](http://getbootstrap.com/) template.

The web application framework is [Express](http://expressjs.com/), handling request routing 
and html template rendering ([handlebars](http://handlebarsjs.com/)). It exposes the app's data layer 
through an [api](routes/api.js).

The main web application is structured with Backbone.js. 
It uses [Browserify](http://browserify.org/) bundle the app's javascript modules, 
so it is necessary to run `npm run build` whenever js changes are made. 


# Build

    $ npm install
    $ npm run build
    $ npm start


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

