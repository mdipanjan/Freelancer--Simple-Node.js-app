const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const ProjectSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    client:{
        type: String,
        required:true
    },
    platform:{
        type: String,
        required:true
    },
    details:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('projects',ProjectSchema);