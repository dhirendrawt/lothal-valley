const User_role = require('../../models/user_role.model')
const { validationResult } = require('express-validator');
module.exports = {
    "index": async (req , res ) =>{
        const { page = 1, limit = 15,} = req.query;
        try
        {
            
            const result = await User_role.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const count = await User_role.count();            
            return res.render('admin/userRole/list',{result:JSON.parse(JSON.stringify(result)), current: parseInt(page), pages:Math.ceil(count / limit),title:'Add User Role',page_title_1:'User Role',page_title_2:'User',layout:'dashboard_layout', isUserRole: true})
        }
        catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/user-role');
        }
    },
    "userRole_create": async(req,res) =>{
       return res.render('admin/userRole/add',{title:'Add User Role',page_title_1:'User Role Add',page_title_2:'User',layout:'dashboard_layout', isUserRole: true})
    },
    "userRole_add" : async(req , res)=>{
        const error = validationResult(req)
        if(error.errors.length > 0){
            req.flash("form1",[{'user_Role':req.body.user_Role}])
            req.flash('user_Role_error',error.errors)
            return res.redirect('/admin/user-role/add');
        }
        try {
            const isdata =await User_role.find().count();
            if(isdata)
                var result = await User_role.find({}).sort({serial_no: -1}).limit(1);
            const user_role = new  User_role({
                serial_no : isdata ? result[0].serial_no+1 : 1,
                user_role_name : req.body.user_Role,
                status : true
            })
            console.log("data : ",user_role);
            await user_role.save();
            req.flash('message','  New record insert successfully !');
            return res.redirect("/admin/user-role");
        } 
        catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/user-role');
        }
    },
    "status_change" : async (req,res) =>{
        const id = req.params.id;
        try {
            const data = await User_role.findOne({_id : id});
            data.status = !data.status;
            await data.save();
            req.flash('message','  Status update successfully !');
            return res.redirect('/admin/user-role');
        } 
        catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/user-role');
        }
    },
    "delete" : async (req,res) =>{
        try {
            await User_role.deleteOne({ _id : req.body.id })
            req.flash('message','  Deleted successfully !');
           return  res.redirect('/admin/user-role')
        } 
        catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/user-role');
        }
    
    
    },

    "edit_create" : async(req,res) =>{
        console.log('isedit : ',req.query.isedit)
        const id = req.params.id;
        if(req.query.isedit=='true'){
            var data = await User_role.find({_id : id}); 
           res.render('admin/userRole/edit',{data:JSON.parse(JSON.stringify(data)),title:'Add User Role',page_title_1:'User Role',page_title_2:'User',layout:'dashboard_layout', isUserRole: true})
        }
        else{
            res.render('admin/userRole/edit',{data:JSON.parse(JSON.stringify([{_id:id}])),title:'Add User Role',page_title_1:'User Role',page_title_2:'User',layout:'dashboard_layout', isUserRole: true})
         }
    },
    "update": async( req, res) => {
        const error = validationResult(req)
        if(error.errors.length > 0){
            req.flash("form1",[{'user_role_name':req.body.Property_type}])
            req.flash('user_role_error',error.errors)
            return res.redirect('/admin/user-role/edit/'+req.params.id+"?isedit=false");
        }
        try {
            const id = req.params.id
            const data = await User_role.findOne({_id : id}); 
            data.user_role_name = req.body.user_role_name;
            await data.save();
            req.flash('message','  Record update successfully !');
            return res.redirect('/admin/user-role');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/user-role');
        }
    },

    "searching" : async(req,res) =>{
        var key = req.query.key;
        
        var re = new RegExp('^'+key+'',"i");
        console.log(re)
        const { page = 1, limit = 15,} = req.query;
            const result = await User_role.find(
                {
                    "$or":[
                        {user_role_name: re}
                        ]
                }
            )
                //.limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
        const count = await User_role.find({user_role_name:{ $regex: new RegExp(key, 'i')} }).count();
        
        res.json(({result : result, current: parseInt(page), pages:Math.ceil(count / limit)}))
        
    }
}