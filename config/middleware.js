module.exports.setFlash=  function(req , res ,next)
{
    console.log(" I am in middleware..............");
    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}