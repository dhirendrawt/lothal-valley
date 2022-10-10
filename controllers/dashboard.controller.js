module.exports = {
    "index": (req, res, next) => {
        res.render('dashboard',{title:'Dasbhoard',page_title_1:'Home Page',page_title_2:'Dashboard',layout:'dashboard_layout'});
    }
}