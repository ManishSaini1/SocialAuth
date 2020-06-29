const  passport= require('passport');
const LocalStrategy=require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User= require('../models/user');

passport.use( new LocalStrategy({
        usernameField : 'email',
        passReqToCallback: true
    },
        function(req, email, password, done)
        {
                User.findOne({email  :email}, function(error, user)
                {
                    if(error)
                    {
                        req.flash('error', error);
                        return done(error);
                    }
                    bcrypt.compare(password, user.password).then(function(result) {
                        console.log("PAssword matched", result);
                        if(!result)
                        {
                            req.flash('error','Invalid User Name/ password');
                            console.log('Invalid User Name/ password');
                            return done(null, false);
                        }
                        // req.flash("success",`Welcome ${user.name}`);
                        // req.flash("success", "Logged in SuccessFully!!");
                        return done(null, user);
                    });
                    

                    // if(!user || user.password!=password)
                    // {
                    //     //req.flash("success",  " Logged in Successfully");
                    //      req.flash('error','Invalid User Name/ password');
                    //     console.log('Invalid User Name/ password');
                    //     return done(null, false);
                    // }
                    // return done(null, user);

                })
        }
     ));

     // Serialize the useruser to decide which key is to be kept in the Cookie
     passport.serializeUser(function(user, done)
     {
         console.log("In serialize", user)
         done(null,  user);
     });
     //deserialize the user from the key in the cookie
     passport.deserializeUser(function(id, done)
     {
         
                User.findById(id, function(error, user)
                {
                    if(error){console.log("Error in finding user -->> passpoer");return done(error);}
                    console.log("In deserialize", user);
                    return done(null, user);
                });
     });
     passport.checkAuthentication= function(req,res , next)
     {
         if(req.isAuthenticated())
         {
                return next();
         }
         return res.redirect('/login');
     }
     passport.setAuthenticatedUser =  function(req, res, next)
     {
         if(req.isAuthenticated())
         {
             console.log("seetting locals", req.user);
             res.locals.user=req.user;
             console.log("Printing", res.locals.user.name);
         }
         next();
     }

     module.exports=passport;    