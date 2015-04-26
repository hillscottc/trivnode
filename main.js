var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next) {
    res.render('index', { site_name: 'TrivNode' });
});

app.get('/about', function(req, res, next) {
    res.render('about', { site_name: 'TrivNode' });
});


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
