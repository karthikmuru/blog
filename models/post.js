var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  
  id : Number, 
  author : String, 
  date : Date,
  updated : Date,
  title : String,
  subtitle : String,
  content :String, 
  tags : String
});


var Post = mongoose.model('Post', postSchema);
module.exports = Post;


