module.exports = {
    "index" : (req,res)=>{
      return res.render('main/index',{layout:'main_layout'});
    }
}