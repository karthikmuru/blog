var Blog = require('./controller/blogController.js');
var Login = require('./controller/passportController.js');

module.exports = function(app, passport){
  
  app.get('/', Blog.Home);
  app.get('/about', Blog.About);
  app.get('/admin',Blog.Admin);
  
  app.post('/admin', passport.authenticate('local-login', {
        successRedirect : '/admin/home', 
        failureRedirect : '/admin'
  }));
  
};