const User=require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.createSession=async function(req , res)
{
    console.log(req.body);
    req.flash("success",  " Logged in Successfully");
    return res.redirect('/');
    // User.findOne({email  :req.body.email}, function(error, user)
    // {
    //    console.log(user);
    // //    res.locals.user=req.user;
    //     req.flash("success",`Welc`);
    //     return res.redirect('/');
    // });
    }
module.exports.update= async function (req,res) 
{   
    const hash =await bcrypt.hashSync(req.body.password, saltRounds);
    User.findOne({email  :req.body.email}, function(error, user)
    {
    const id=user._id;
    console.log(id);
    User.findByIdAndUpdate(id,
        {   name:req.body.name,
            password:hash
        }, function(erorr, done)
        {
            if(error){console.log("Error in Updating",erorr); return}
            req.flash("success", "SuccessFully Updated!!");
            user.save();
            return res.redirect('/');
        })
    });
}
module.exports.signout=function(req,res)
 {
     
    req.logout();
    req.flash("success",  " You Logged Out Successfully! ");
    return  res.redirect('/login');
 }