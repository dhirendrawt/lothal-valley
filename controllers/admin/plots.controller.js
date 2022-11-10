module.exports = {
    'index' : (req,res)=>{
        res.render('admin/plots/list',{title:'Plots', page_title_1:'Plots Page',page_title_2:'Plots Listing',isPlot : true , layout:'dashboard_layout'})
    },
    'verification': (req,res)=>{

    }
}   
