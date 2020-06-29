const express=require('express');
const router=express.Router();
const passport=require('passport');
const homeController = require('../controllers/home_controller');
const signUpController=require('../controllers/sign_up_controller');
const loginController=require('../controllers/login_controller');
const userController=require('../controllers/user_controller');
console.log("HERE IN THE ROUTER");
router.get('/',homeController.home);
router.get('/signup',signUpController.signup);
router.post('/user/create',signUpController.createUser);
router.get('/login', loginController.login);
router.get('/signout',userController.signout);
router.get('/users/auth/google',passport.authenticate('google', {scope:['profile', 'email']}));
router.post('/update',userController.update);
router.get('/users/auth/google/callback', passport.authenticate('google',{failureRedirect :'/login'}), userController.createSession);
router.post('/create-session',passport.authenticate(
    'local',
    { 
        failureRedirect: '/login'
    },
),userController.createSession);


module.exports=router;