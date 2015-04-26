var Backbone = require("backbone");
var $ = require('jquery');
Backbone.$ = $;

var CluesView = require('./views/clues');

var app = app || {};

$(function() {
    new app.CluesView();
});
