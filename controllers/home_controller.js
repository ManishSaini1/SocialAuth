module.exports.home=function(req,res)
{
    if(req.isAuthenticated())
    {
        //  req.flash("success", "Login Succesfully");
        // console.log(" I AM HERE IN LOGIN ", req.body);
        return res.render('home');      
    }
          return res.redirect('/login');
    // return res.end("<h1> At profile Section<h1>");
}