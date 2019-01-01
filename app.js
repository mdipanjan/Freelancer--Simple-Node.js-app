const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const about = require('./routes/about');
const storyboard = require('./routes/storyboard');
const app = express();


//Database

const db = require('./config/database');

//Load the user route//
app.use('/users',users);

//Load the about route//
app.use('/about',about);


app.use('/storyboard',storyboard);




//HANDLEBAR MIDDLEWARE

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//To load static css
app.use(express.static(path.join(__dirname, 'public')));


//To load static images
app.use(express.static('public/images')); 

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//Connect to mongoose
mongoose.connect(db.mongoURI,{
    useNewUrlParser: true 
})
.then(()=>console.log('mongodb connected'))
.catch(err=> console.log(err));

//load projects model
require('./models/Projects');
const Projects = mongoose.model('projects');




require('./models/User');
const Users = mongoose.model('users');


//render the main page

app.get('/',(req, res)=>{
    res.render('index');
});



//Projects index page 

app.get('/projects',(req, res)=>{
    Projects.find({})
    .sort({date:'desc'})
    .then(projects=>{
        res.render('projects/index',{
            projects:projects
        });
    });

});

//Add the projects form
app.get('/projects/add',(req, res)=>{
    res.render('projects/add');
});

//process the form
app.post('/projects',(req, res)=>{
    let errors = [];
    if(!req.body.title){
        errors.push({text:'please add title'});
    }
    if(!req.body.client){
        errors.push({text:'please add client'});
    }
    if(!req.body.platform){
        errors.push({text:'please add platform'});
    }
    if(!req.body.details){
        errors.push({text:'please add details'});
    }
    if(errors.length>0){
        res.render('projects/add',{
            errors:errors,
            title:req.body.title,
            client:req.body.client,
            platform:req.body.platform,
            details:req.body.details

        });
    }else{
       const newUser = {
        title:req.body.title,
        client:req.body.client,
        platform:req.body.platform,
        details:req.body.details
       }
       new Projects(newUser)
       .save()
       .then(projects=>{
           res.redirect('/projects');
       })

    }
})






const port = process.env.PORT ||5000;
app.listen(port,()=>{
  console.log(`listening at port${port}`); 
});