// server.js
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var app = express();

app.use(cookieParser());
app.use(expressSession({
    
    secret: '123456789QWERTY',
    resave: false,
    saveUninitialized: false
    
}));


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use(express.static('./views'));
app.use(express.static('./views/css'));
app.use(bodyparser.urlencoded({extended : false}));

app.use(passport.initialize());
app.use(passport.session()); 

var mongooseURI = 'mongodb://karthik:test123$@ds035975.mlab.com:35975/blog_account';
mongoose.connect(mongooseURI);

require('./routes.js')(app, passport);
require('./controller/passportController.js')(passport);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
