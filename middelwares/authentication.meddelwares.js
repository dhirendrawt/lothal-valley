module.exports = {
    "auth":(req,res,next)=>{
        if(req.session.auth) {
        
        next();
        }else{
        req.flash('message',[{"value":"","msg":"You are not authorized person","param":"isUthrized","location":"body"}]);
        return res.redirect('/admin');
        }
    }
}