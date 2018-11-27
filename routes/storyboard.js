const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//renders the storyboard page
router.get('/', (req, res)=>{
    res.render('storyboard/popup');
});

module.exports = router;