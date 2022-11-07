module.exports = {
    "index" : (req,res)=>{
      return res.render('home/index',{layout:'home_layout'});
    }
}