var crypto = require('crypto');
var moment = require('moment');



var LocalStrategy    = require('passport-local').Strategy;
var User = require('../models/user.js');

/*module.exports.add = function(req, res){
  
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = encrypt(process.env.KEY, req.body.password);
      
  newUser.save(function(err, data){
        
    if(err){
      res.send(err);
    }     
    else{
      res.send(data);
    }
      
  });
  
  
}*/


module.exports = function(passport){
  
  passport.serializeUser(function(data, done) {
    
	  done(null, data);
  
  });
  passport.deserializeUser(function(data, done) {

      User.findOne({username : data}, function(err, user) {
		  
        if(user!=null)
          done(null, {username : data});
	
      });
  });

  passport.use('local-login', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password',
      passReqToCallback : true
		},
	  function(req, username, password, done) { 
		
      
      User.findOne({username : username}, function(err, data){
        
        //console.log(data.password);
        //console.log(decrypt(process.env.KEY, data.password));
        if(err) done(false);
        if(!data) done(null, false);
        if(decrypt(process.env.KEY, data.password) != password) return done(null,false);
        else return done(null, username);
          
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
