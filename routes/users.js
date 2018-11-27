const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

//Body parser middleware
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())




//Log in page
router.get('/login',(req, res)=>{
    res.render('users/login');
});

//Signup page

router.get('/signup',(req, res)=>{
    res.render('users/signup');
});

//signup form POST

router.post('/signup',(req, res)=>{
    console.log(req.body);


let errors = [];

if(req.body.password != req.body.password2){
    errors.push({text: 'passwords do not match'});
}

if(req.body.password.length < 4){
    errors.push({text: 'passwords need to be atleast 4 characters long'});
}
if(errors.length > 0){
    res.render('users/signup',{
        errors:errors,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        password2:req.body.password2
    });
}else{
    res.send('passed');
}

    
});



module.exports = router;