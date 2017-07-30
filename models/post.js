var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  
  author : String, 
  date : Date,
  title : String,
  content :String
  
});


var Post = mongoose.model('Post', postSchema);
module.exports = Post;


