const passport =require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user'); 

passport.use( new googleStrategy({
        clientID: 'Your CLient Id',
        clientSecret: 'Your Secret Key',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'

    },
    function(accessToken, refreshToken, profile, done)
    {
        User.findOne({email: profile.emails[0].value}).exec(function(error, user)
        {
            if(error){console.log("error in finding USer Google startegy", error);  return}
            console.log(profile);
            if(user)
            {
                return done(null ,user);
            }
            else
            {
                User.create(
                    {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },
                    function(error,user)
                    {
                        if(error){console.log("error in Creating  USer Google startegy", error);  return} 
                        return done(null, user);                       
                    }
                )
            }
        })
    }
))







