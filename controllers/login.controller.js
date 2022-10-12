var  Users = require('../models/users.model')
module.exports = {
    'login' : (req,res)=>{
       
        console.log('login page')
        res.render('login',{title:'Login'});
    },
    'forget_pwd': (req, res) => {
        res.render('forgetPwd',{title:'Forgot Password'});
    },
    'authentication':(req,res) =>{
        console.log('auth function working')
        const user_email=req.body.user_email
        const user_password=req.body.user_password
        console.log(user_email)
        
        Users.find().then(p => console.log(p))
        .catch(error => console.log(error));

        // res.render('dashboard',{title:'Dasbhoard',page_title_1:'Home Page',page_title_2:'Dashboard',layout:'dashboard_layout'});
    } 
    
}