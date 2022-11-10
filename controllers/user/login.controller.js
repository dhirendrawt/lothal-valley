module.exports = {
    "index" : (req,res)=>{
        return res.render('user/login',{layout:'home_layout'})
    },
    "login" : (req, res) => {
        res.send('login completed');
    },
    "signup" : (req, res) => {
        return res.render('user/signup',{layout:'home_layout'})
    },
    "logout" : (req, res) => {
        res.send('logout successfully');
    }
}