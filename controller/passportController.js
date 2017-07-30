var crypto = require('crypto');
var moment = require('moment');



var LocalStrategy    = require('passport-local').Strategy;
var User = require('../model/user.js');




module.exports = function(passport){
  
  passport.serializeUser(function(user, done) {
    
	  done(null, user);
  
  });
  passport.deserializeUser(function(id, done) {
	  console.log("deserialize");
      User.findById(id, function(err, user) {
		  
      if(user!=null)
				
          done(null, {username : user.username,id:user._id});
		  
      });
  });

  passport.use('local-login', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password'
		},
	  function(req, username, password, done) { 
		
      
      var newUser = new User();
      newUser.username = username;
      newUser.password = encrypt(key, password);
      
      newUser.save(function(err, data){
        
        console.log(data);
        return (null, username);
      
      });
		}));
  
}

function encrypt(key, data) {
	
  var cipher = crypto.createCipher('aes-256-cbc', key);
	var encrypted = cipher.update(data, 'utf-8', 'hex');
	encrypted += cipher.final('hex');

	return encrypted;
}

function decrypt(key, data) {
	
  var decipher = crypto.createDecipher('aes-256-cbc', key);
	var decrypted = decipher.update(data, 'hex', 'utf-8');
	decrypted += decipher.final('utf-8');

	return decrypted;
}