module.exports = {
    'login' : (req,res)=>{
        res.render('login',{title:'Login'});
    },
    'forget_pwd': (req, res) => {
        res.render('forgetPwd',{title:'Forgot Password'});
    }
}