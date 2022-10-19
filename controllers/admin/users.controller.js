module.exports = {
    'index' : (req,res)=>{
        res.render('admin/users/add',{title : 'Users Add Page',page_title_1:'Add Users Page' ,layout:'dashboard_layout', isUsers: true})
    }
}