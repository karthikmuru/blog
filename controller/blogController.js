

var moment = require('moment');
var Post = require('../models/post.js');


module.exports.Home = function(req, res){
  Post.find({}, function(err, data){
    
    if(err) res.send(err);
    else{
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
 
  if(!req.isAuthenticated()) res.redirect('/');
  var id = req.params.id;
  
  Post.findOne({_id : id}, function(err, data){
    
    res.render('home', ({right : './partials/makePost', edit : true, data : data, auth : req.isAuthenticated()}));
    
  });
  
}

module.exports.MakeEdit = function(req, res){
 
  var id = req.params.id;
  var currentDate = moment.utc().format("YYYY-MM-DD");
  console.log(id);
  console.log("jskldf");
  Post.findOneAndUpdate({ _id : id}, {$set : { title : req.body.title, subtitle : req.body.subtitle ,content : req.body.content, tags : req.body.tags, updated : currentDate}}, function(err, data){
    
     console.log("hello");
    if(err) res.send(err);
    else res.redirect('/article/' + id);
    
  });
  
}

module.exports.Delete = function(req, res){

  var id = req.params.id;
  
  Post.remove({_id : id}, function(err, data){
    
    if(err) res.send(err);
    else res.redirect('/')
    
  });

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