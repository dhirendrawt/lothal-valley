const userRole = require('../../models/user_role.model')
const states = require('../../models/states.model')
const UsersData = require('../../models/users_data.model')
const { Schema } = require('mongoose')
const { validationResult } = require('express-validator')

module.exports = {
    'index' : async (req,res)=>{
        const user_role = await userRole.find({})
        const data = await states.find()
    
        res.render('admin/users/add',{title : 'Users Add Page',page_title_1:'Add Users Page' ,layout:'dashboard_layout', user_role:user_role , data:data , isUsers: true})
    },

    'state_data' : async (req,res)=>{
   
        const data = await states.find({_id:req.body.state_id}).select('districts')
        
        res.send(200,data[0].districts)
    },
    
    'add_user' : async (req,res)=>{

        const error = validationResult(req); 

        if(error.errors.length > 0){
            req.flash("form1",[{
                "first_name" : req.body.first_name ,
                "last_name" : req.body.last_name ,
                "email" : req.body.email ,
                "mobile_number" : req.body.mobile_number ,
                "user_role" : req.body.user_role ,
                "state" : req.body.state ,
                "city" : req.body.city,
                "description" : req.body.description
            }]);
            console.log(error.errors);
            req.flash('product_error',error.errors)
            return res.redirect('/admin/users')
        }

        await UsersData.create({
            first_name : req.body.first_name ,
            last_name : req.body.last_name ,
            email : req.body.email ,
            mobile : req.body.mobile_number ,
            user_role : req.body.user_role ,
            state : req.body.state ,
            city : req.body.city ,
            description : req.body.description 

        })

        return res.redirect('/admin/dashboard')
    }
}