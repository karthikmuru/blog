// server.js
var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static('./views'));

require('./routes.js')(app);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
