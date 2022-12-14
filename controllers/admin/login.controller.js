var Users = require('../../models/users.model');
const bcrypt = require("bcrypt");
var session = require('express-session');
var { body, validationResult } = require('express-validator');

module.exports = {
    'login': (req, res) => {

        // console.log('login page');
        res.render('admin/login', { title: 'Login', message : req.flash('message')});
    },
    'forget_pwd': (req, res) => {
        res.render('admin/forgetPwd', { title: 'Forgot Password' });
    },
    'authentication': async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash('message', errors.errors);
            return res.redirect('/admin');
        }
        try {
            const loginuser = await Users.findOne({ email: req.body.user_email }).populate('role');
            console.log('role',loginuser);
            if (!loginuser) {
                req.flash('message',[{"value":"","msg":"Invalid User","param":"user_email","location":"body"}]);
                 return res.redirect('/admin');
            }else if(loginuser.role.user_role_name != 'Admin'){
                req.flash('message',[{"value":"","msg":"You are not authorized person","param":"isUthrized","location":"body"}]);
                return res.redirect('/admin');
            }
            const result = await bcrypt.compare(req.body.user_password, loginuser.password);
               
            if (!result) {
               req.flash('message',[{"value":"","msg":"Invalid Password","param":"user_password","location":"body"}]);
               return res.redirect('/admin');
            }

            const loggedinuser = await Users.find({ email: req.body.user_email });

           req.session.auth = loggedinuser;
           return res.redirect('/admin/dashboard');

        } catch (error) {
            return {'message':error};
        }

         
    },
    'logout':  (req,res,next)=>{ 
        delete req.session.auth;
        return res.redirect('/admin');
    }

}