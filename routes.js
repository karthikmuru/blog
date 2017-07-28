var Blog = require('./blog.js');

module.exports = function(app){
  
  app.get('/', Blog.Home);
  
};