module.exports = {
    "index": (req, res, next) => {
        res.render('admin/dashboard',{title:'Dasbhoard',page_title_1:'Home Page',page_title_2:'Dashboard' , dashboard_map : true,layout:'dashboard_layout', isdashboard: true});
    }
    
}