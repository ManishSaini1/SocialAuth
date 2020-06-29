const User= require('../models/user');
module.exports.login=function(req, res)
{
    if(req.isAuthenticated())
    {
        //  req.flash("success", "Login Succesfully");
        console.log(" I AM HERE IN LOGIN ", req.body);
        return res.redirect('/');
    }
    return res.render('login');
}
// module.exports.login= async function(req,res)
// {
//     const findUser=await User.findOne({req.body.email});
//     console.log("USER found", findUser);
//     User.findOne(req.body.email,function(error, user)
//     {
//         console.log("INFIRST  "  +user);
//         if(!user || user.password!=req.body.password)
//         {
//                 console.log('error  in login' , req.body);
//                 console.log("ist", req.body.password);
//                // console.log("2nd", user.password);
//                 req.flash('error', error);
//                 // return res.redirect('back');
//                 return res.redirect('back');
//         }
      
//         console.log("SuccessFully Login", user.name);
//         req.flash("success",  " Logged in Successfully");
//         return res.render('signup');
//     })
// }