const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//renders the about page
router.get('/',(req, res)=>{
    res.render('about');
});

module.exports = router;