module.exports = {
    "index" : (req,res)=>{
      return res.render('home/index',{layout:'home_layout'});
    },
    "about": (req,res)=>{
      return res.render('home/about',{layout:'home_layout'});
    },
    "contact" : (req, res) => {
      return res.render('home/contact',{layout:'home_layout'})
    },
    "properties" : (req, res) => {
      return res.render('home/properties',{layout:'home_layout'})
    },
    "blog" : (req, res) => {
      return res.render('home/blog',{layout:'home_layout'})
    }
    
}