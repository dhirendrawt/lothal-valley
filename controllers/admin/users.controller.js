const userRole = require('../../models/user_role.model')

module.exports = {
    'index' : async (req,res)=>{
        const user_role = await userRole.find({})
       
        res.render('admin/users/add',{title : 'Users Add Page',page_title_1:'Add Users Page' ,layout:'dashboard_layout', user_role:user_role ,isUsers: true})
    }
}