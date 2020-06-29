const express= require('express');
const app=express();
const port =8000;
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');
let ejs=require('ejs');
const flash=require('connect-flash');
const customWare=require('./config/middleware');
const passport= require('passport');
const passportLocal=require('./config/passport_local_strategy');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const passportGoogle= require('./config/passport-google-oauth2-strategy');

app.use(cookieParser());
app.use(express.urlencoded());
// app.use(ejs);
app.use((express.static(__dirname + '/assets')));
app.set('view engine', 'ejs');
 app.set('views', './views');


 app.use(session(
     {
         name: "socailAuth",
         secret:"ToDo",
         saveUninitialized:true,
         resave:true,
         cookie:
         {
             maxAge:(1000*60*60*60)
         },
         store: new MongoStore(
         {
             mongooseConnection: db,
             autoremove :'disabled'
         },
         function(error)
         {
             if(error){console.log("ERROr in Coookie Store", error); return}
             console.log("Successfully Stored in Cookie");
         })
     }));
     app.use(passport.initialize());
     app.use(passport.session());
     app.use(passport.setAuthenticatedUser);
     app.use(flash());
     app.use(customWare.setFlash);

    app.use('/',require('./routes'));
    app.listen(port, function(error)
    {
        if(error)
        {
            console.log("Error while Connecting to Port");
            return;
        }
        console.log("SuccessFully running on Prot: ", port);
        
    });