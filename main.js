var debug = require('debug')('trivnode:main');
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars');

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

var api = require('./routes/api');
app.use('/api', api);


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;