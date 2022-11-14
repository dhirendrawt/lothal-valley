var Users = require('../../models/users.model');
const bcrypt = require("bcrypt");
var {  validationResult } = require('express-validator');


module.exports = {
    "index" : (req,res)=>{
        return res.render('user/login',{layout:'home_layout'})
    },
    "login" : (req, res) => {
        res.send('login completed');
    },
    "signup_index" : (req, res) => {
        
        return res.render('user/signup',{layout:'home_layout'})
    },
    "signup" : async(req, res) => {
        console.log('agree:',req.body.agree)
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash("form_value",[{
                "name" : req.body.name ,
                "email" : req.body.email ,
                "mobile" : req.body.mobile 
            }]);
            req.flash('message',errors.errors);
            return res.redirect('/user/signup');
        }
        try {
            const password = await bcrypt.hashSync(req.body.password,12);
            console.log(password)
            await Users.create({
                name : req.body.name,
                email : req.body.email,
                mobile_no : req.body.mobile,
                agree : req.body.agree ? 1 : 0,
                password : password
            })

            return res.send('ok');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/user/signup');
        }
    },
    "logout" : (req, res) => {
        res.send('logout successfully');
    }
}