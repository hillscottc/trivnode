[![Build Status](https://travis-ci.org/hillscottc/trivnode.svg?branch=master)](https://travis-ci.org/hillscottc/trivnode) [![Coverage Status](https://coveralls.io/repos/hillscottc/trivnode/badge.svg?branch=master&service=github)](https://coveralls.io/github/hillscottc/trivnode?branch=master)
# TrivNode

***I've truncated this db to save a few bucks. My more recent [https://github.com/hillscottc/trivnode-react] has all the clues.***


An interface for answering Jeopardy-style clues from a PostgreSQL database of 180,000+ trivia questions. 

Deployed at: [https://protected-lake-8296.herokuapp.com/](https://protected-lake-8296.herokuapp.com/) 

## Build

    $ npm install
    $ npm start

## Components
This is a single-page application in [Node](https://nodejs.org/). 
The layout is a responsive [Bootstrap](http://getbootstrap.com/) template.

The web application framework is [Express.js](http://expressjs.com/), handling request routing 
and html template rendering ([Handlebars.js](http://handlebarsjs.com/)). 

The main web application is structured with [Backbone.js](http://backbonejs.org/). It is primarily used primarily 
to implement the app's fast 'as-you-type' search filter on the main page. 


