const User = require('../models/user.js');
const express =require('express');
const router = express.Router();



     router.post('/register', (req, res) => {

       let user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
          });

      //  user.save((err) => {
      //    if(err){
      //      res.json({ success: false, message: err });
      //    }else{
      //       res.json({ success: true, message: 'se inserto' });
      //    }
      //  });
    // Check if email was provided

    user.save((err) => {
            // Check if error occured
            if (err) {
              // Check if error is an error indicating duplicate account
              if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
              } else {
                // Check if error is a validation rror
                if (err.errors) {
                  // Check if validation error is in the email field
                  if (err.errors.email) {
                    res.json({ success: false, message: err.errors.email.message }); // Return error
                  } else {
                    // Check if validation error is in the username field
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message }); // Return error
                    } else {
                      // Check if validation error is in the password field
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message }); // Return error
                      } else {
                        res.json({ success: false, message: err }); // Return any other error not already covered
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                }
              }
            } else {
              res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
          });   
    
  });
  

  router.post('/login', (req, res)=>{
    if(!req.body.username){
      res.json({success: false, message: 'username is required'});
    }else{
      if(!req.body.password){
        res.json({success: false, message: 'password is required'});
      }else{
        //sin errores, entonces busca el usuario
        User.findOne({username: req.body.username}, (err, user)=>{
          if(err){
            res.json({success: false, message: err});
          }else{
            if(!user){
              res.json({success: false, message: 'User does not exist in app'});
            }else{
              //encontro el usuario
              const validPassword = user.comparePassword(req.body.password);
              if(!validPassword){
                res.json({success: false, message: 'invalid password'});
              }else{
                res.json({success: true, message: 'logged'});
              }
            }
          }
        });
      }
    }
  });


    module.exports = router;
