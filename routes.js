var Blog = require('./controller/blogController.js');
var Login = require('./controller/passportController.js');

module.exports = function(app, passport){
  
  app.get('/', Blog.Home);
  app.get('/about', Blog.About);
  app.get('/admin',Blog.Admin);
  
  //app.post('/admin', Login.add);
  
  app.post('/admin', passport.authenticate('local-login', {
        successRedirect : '/about', 
        failureRedirect : '/admin'
  }));
  app.get('/article/:id', Blog.Article);
  
  app.get('/post', Blog.Post);
  app.post('/post', Blog.MakePost);
  
  app.get('/edit/:id', Blog.Edit);
  app.post('/edit/:id', Blog.MakeEdit);

  app.get('/delete/:id', Blog.Delete);  

  app.get('/logout', Blog.Logout);
};