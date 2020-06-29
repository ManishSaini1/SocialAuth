const User=require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.signup=function(req, res)
{
    if(req.isAuthenticated())
    {
        //  req.flash("success", "Login Succesfully");
        console.log(" I AM HERE IN LOGIN ", req.body);
        return res.redirect('/');
    }
    return res.render('signup');
}
module.exports.createUser= async function(req, res)
{
   const findUser1=await User.findOne({email :req.body.email});
   if(findUser1)
   {
    req.flash("error", "Email already exists / try another");
    return res.redirect('/signup');
   }
   console.log("Body  ",req.body);
    if(req.body.password!=req.body.confirmPassword)
    {
        console.log("passWord and confirm pwd didn't match");
        req.flash("error", "Password and Confirm Password Should be same");
        return res.redirect('/signup');
    }
    
const hash =await bcrypt.hashSync(req.body.password, saltRounds);
    User.create(
        {
            name : req.body.name,
            email: req.body.email,
            password:hash

        },function(error,user)
        {
            if(error){console.log("Erro while Creating USer", error); return}
            req.flash("success",  "Account Created Successfully");
                return res.redirect('/login');
        }
)
    // return res.render('home');
}