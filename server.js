// server.js
var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use(express.static('./views'));

app.use(passport.initialize());
app.use(passport.session()); 

var mongooseURI = 'mongodb://karthik:test123$@ds035975.mlab.com:35975/blog_account';
mongoose.connect(mongooseURI);

require('./routes.js')(app, passport);
require('./controller/passportController.js')(passport);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
