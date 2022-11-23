const Users = require('../../models/users.model');
const AppSetting = require('../../models/app_setting.model');
const bcrypt = require("bcrypt");
var {  validationResult } = require('express-validator');


module.exports = {
    "index" : async(req,res)=>{
        const app_settings = await AppSetting.findOne({status : true}).populate('state');
        return res.render('user/login',{app_settings : app_settings,layout:'home_layout', message : req.flash('message')})
    },
    "login" : async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash('message', errors.errors);
            console.log(errors.errors)
            return res.redirect('/user');
        }
        try {
            const loginuser = await Users.findOne({ email: req.body.email }).populate('role');
            console.log('role',loginuser);
            if (!loginuser) {
                req.flash('message',[{"value":"","msg":"Invalid User","param":"email","location":"body"}]);
                return res.redirect('/user');
            }else if(loginuser.role.user_role_name != 'Buyer'){
                req.flash('message',[{"value":"","msg":"You are not authorized person","param":"isUthrized","location":"body"}]);
                return res.redirect('/user');
            }
            const result = await bcrypt.compare(req.body.password, loginuser.password);
               
            if (!result) {
                console.log('password not match')
               req.flash('message',[{"value":"","msg":"Invalid Password","param":"password","location":"body"}]);
               return res.redirect('/user');
            }

            const loggedinuser = await Users.find({ email: req.body.user_email });

           req.session.user = loggedinuser;
           //res.send('login successfully');
           return res.redirect('/user/dashboard');

        } catch (error) {
            return {'message':error};
        }

    },
    "signup_index" : async(req, res) => {
        const app_settings = await AppSetting.findOne({status : true}).populate('state');
        return res.render('user/signup',{app_settings : app_settings,layout:'home_layout'})
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
            console.log('error:',errors.errors);
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

            return res.redirect('/user');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/user/signup');
        }
    },
    "logout" : (req, res) => {
        delete req.session.user;
        return res.redirect('/');
    }
}