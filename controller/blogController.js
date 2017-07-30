
module.exports.Home = function(req, res){
  
  res.render('home', ({right : 'partials/test'}) );
  
}

module.exports.About = function(req, res){
  
  res.render('home', ({ right : 'partials/about'}));
  
}

module.exports.Admin = function(req, res){
  
  res.render('home', { right : 'partials/login'});
  
}