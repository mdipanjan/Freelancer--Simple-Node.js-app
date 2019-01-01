if(process.env.NODE_ENV === 'production'){
    module.exports={
        mongoURI:'mongodb://<dbuser>:<dbpassword>@ds113063.mlab.com:13063/freelancer'
    }
}else module.exports={
    mongoURI:'mongodb://localhost/freelancer-dev'
}