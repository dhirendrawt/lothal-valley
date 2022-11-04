const userRole = require('../../models/user_role.model')
const states = require('../../models/states.model')
const UsersData = require('../../models/users_data.model')
const { Schema } = require('mongoose')
const { validationResult } = require('express-validator')


module.exports = {
    'index' : async (req,res)=>{
        const { page = 1, limit = 15 ,amount = 0} = req.query;
        try {
            const user_data = await UsersData.find().populate('state').populate('user_role')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
            const count = await UsersData.count();
            res.render('admin/users/list',{data : JSON.parse(JSON.stringify(user_data)), current: parseInt(page), pages:Math.ceil(count / limit),title : 'Users Page',page_title_1:'Users Page',banner:'Users' ,layout:'dashboard_layout' , isUsers: true})
        } catch (error) {
            console.log(error);
        }
    },
    'create' : async (req,res)=>{
        try {
            const user_role = await userRole.find({});
            const data = await states.find();
            res.render('admin/users/add',{title : 'Users Add Page',page_title_1:'Add Users Page' ,layout:'dashboard_layout', user_role:user_role , data:data , isUsers: true})
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/users');
        }
    },

    

    'state_data' : async (req,res)=>{
   
        const data = await states.find({_id:req.body.state_id}).select('districts')
        
        res.send(200,data[0].districts)
    },
    
    'add' : async (req,res)=>{

        console.log(req.body.state_id);

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

            req.flash('user_error',error.errors)
            return res.redirect('/admin/users/add')

        }
        try {
            

        await UsersData.create({
            first_name : req.body.first_name ,
            last_name : req.body.last_name ,
            email : req.body.email ,
            mobile : req.body.mobile_number ,
            user_role : req.body.user_role ,
            state : req.body.state ,
            city : req.body.city ,
            description : req.body.description 
        });
        req.flash('message','New record insert successfull !');  
        return res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/users');
        }
    },
    "create_edit" : async(req,res)=>{
        const id = req.params.id;      
        const user_role = await userRole.find({});
        const state = await states.find();
        if(req.query.isedit=='true'){
        const data = await UsersData.findOne({ _id : id });
        return res.render('admin/users/edit',{result : data,user_role : user_role,state : state , page_title_1 : 'Edit Users Details' , page_title_2 : 'Usres Page' ,layout : 'dashboard_layout' , isusers: true  })
        }else{
            return res.render('admin/users/edit',{result : {_id:id},user_role : user_role,state : state , page_title_1 : 'Edit Users Details' , page_title_2 : 'Usres Page' ,layout : 'dashboard_layout' , isusers: true  })
        }
    },
    "update" : async(req,res)=>{
        const error = validationResult(req)
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
            req.flash('user_error',error.errors);
            return res.redirect('/admin/users/edit/'+req.params.id+"?isedit=false");
        }
        try {
            const id = req.params.id
            const data = await UsersData.findOne({_id : id}); 
            data.first_name = req.body.first_name;
            data.last_name = req.body.last_name;
            data.email = req.body.email;
            data.mobile = req.body.mobile_number;
            data.user_role = req.body.user_role;
            data.state = req.body.state;
            data.city = req.body.city;
            data.description = req.body.description;
            await data.save();
            req.flash('message','  Record update successfully !');
            return res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/users');
        }
       
    },
    "delete" : async(req,res)=>{
        try {        
            await UsersData.deleteOne({ _id : req.body.id });
            req.flash('message','Record delete successfull !');
            return res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/users');
        }
    },
    "searching" : async(req,res) =>{
        const key = req.query.key;
        const { page = 1, limit = 15,} = req.query;
        var re = new RegExp('^'+key+'',"i");
        try {
            
        
        const result = await UsersData.find({
                        "$or":[
                            {first_name: re},
                            {email: re}
                            ]
                    })
                .populate('state').populate('user_role')
                //.limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const count = await UsersData.find({first_name:{ $regex: new RegExp(key, 'i')} }).count();
           res.json(({result : result, current: parseInt(page), pages:Math.ceil(count / limit)}))
        } catch (error) {
            console.log(error);
        }
       

        return res.redirect('/admin/dashboard')
    },
    'delete' : async ( req , res ) => {
        // console.log(req.body.user_id);
        await UsersData.deleteOne({ _id : req.body.user_id })
        req.flash('message','Record delete successfull !');
        return res.redirect('/admin/users')
    }
}