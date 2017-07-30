

var moment = require('moment');
var Post = require('../models/post.js');


module.exports.Home = function(req, res){
  Post.find({}, function(err, data){
    
    if(err) res.send(err);
    else{
      console.log(data);
      res.render('home', ({right : 'partials/blog', auth : req.isAuthenticated(), data : data}) );
    }
  });
}

module.exports.About = function(req, res){
  
  
  var user = req.isAuthenticated();    
  res.render('home', ({ right : 'partials/about', data : user, auth : req.isAuthenticated()}));
  
}

module.exports.Admin = function(req, res){
  
  res.render('home', { right : 'partials/login', auth : req.isAuthenticated()});
  
}

module.exports.Post = function(req, res){
  
  var data = {};
  if(req.isAuthenticated())
    res.render('home', ({right : './partials/makePost', edit : false, data : data , auth : req.isAuthenticated()}));
  else
    res.redirect('/');
}

module.exports.MakePost = function(req, res){
  
  var currentDate = moment.utc().format("YYYY-MM-DD");
  var newPost = new Post();
  newPost.title = req.body.title;
  newPost.subtitle = req.body.subtitle;
  newPost.content = req.body.content;
  newPost.tags = req.body.tags;
  newPost.date = currentDate;
  newPost.updated = currentDate;
  
  newPost.save(function(err, data){
    
    if(err) 
      res.send(err);
    else
      res.redirect('/post');
    
  });
  
}

module.exports.Edit = function(req, res){
 
  
}

module.exports.MakeEdit = function(req, res){
 
  
}

module.exports.Delete = function(req, res){
  

}

module.exports.Article = function(req, res){
  
  var id = req.params.id;
  
  Post.findOne({_id : id}, function(err, data){
    
    res.render('home', ({right :'./partials/article', data : data, auth : req.isAuthenticated()}));
    
  });
  
}

module.exports.Logout = function(req, res){
  
  req.logout();
  res.redirect('/');
  
}