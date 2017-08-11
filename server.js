var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var logger = require('morgan');
var request = require('request');
var cheerio = require('cheerio');

// Initialize Express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(process.cwd() + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Routes
var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');
var router = require('./controllers/controller.js');
app.use('/', router);

// Launch App
var port = process.env.PORT || 1800;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});