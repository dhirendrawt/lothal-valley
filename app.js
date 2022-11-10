const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { create  }=require('express-handlebars')
const session = require('express-session') 
const mongoose = require('./mongoose')
const flash = require('express-flash')

const homeRouter = require('./routes/home')
const userLogin = require('./routes/user/login')

const usersRouter = require('./routes/users')
//admin
const adminLoginRouter = require('./routes/admin/login')
const adminDashboardRouter = require('./routes/admin/dashboard')
const adminPropertyRouter = require('./routes/admin/property')
const adminPropertyTypeRouter = require('./routes/admin/property_type')
const adminUserRoleRouter = require('./routes/admin/user_role')
const adminUsersRouter = require('./routes/admin/users')
const plotsRouter = require('./routes/admin/plots')

const userDashboardRouter = require('./routes/user/dashboard')

const middelware = require('./middelwares/authentication.meddelwares')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express()

const hbs = create({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir: __dirname+'/views/layouts/',
  helpers: {
      ifErrorCheck: (a, b, option) => { 
        return (a.param == b) ? option.fn(a) : option.inverse(a); 
      },
      loud: (obj) => {return JSON.stringify(obj)},

      findCity: (a,b,option) => {
        return (a[b] ? option.fn(a[b]):option.inverse(a))
      },
      ifVerify: (a,b,option) => {
        return (a!=b ? option.fn("none") : option.inverse(a))
      },
      isVerifyStatus: (a,option) => {
        if(a==2){
          return option.fn("Verified.....");
        }else if(a==0){
          return option.fn("Rejected...")
        }else{
          return ;
        }
      },
      buttonCreateUser : (a,option) => {
        let output = "";
        if(a=="pending"){
          output += `<a  href="/admin/users"  class="btn btn-primary btn-rounded float-lg-end" style="margin-top:30px;">
          Verify
          </a>
          <a  href="/admin/users?type=reject"  class="btn btn-primary btn-rounded float-lg-end" style="margin-top:30px;">
          Rejected
          </a>`; 
        }else if(a == "reject"){
          output += `<a  href="/admin/users"  class="btn btn-primary btn-rounded float-lg-end" style="margin-top:30px;">
          Verify
          </a>
          <a  href="/admin/users?type=pending"  class="btn btn-primary btn-rounded float-lg-end" style="margin-top:30px;">
          Pending
          </a>`;
        }else if(a == "verify"){
          output += `<a  href="/admin/users?type=pending"  class="btn btn-primary btn-rounded float-lg-end" style="margin-top:30px;">
          Pending
          </a>
          <a  href="/admin/users?type=reject"  class="btn btn-primary btn-rounded float-lg-end" style="margin-top:30px;">
          Rejected
          </a>`;
        }
        return output
        //return (a == b ? option.fn(b) : option.inverse);
      },

      paginate: function(options){
        let output = "";
        let type = options.hash.type ? "&type="+options.hash.type : "" ;

        if(options.hash.current === 1){
            output += `<li class="page-item disabled"><a class="page-link">F</a></li>`;
        }else{
            output += `<li class="page-item"><a href="?page=1${type}" class="page-link">F</a></li>`;
        }

        let i = (Number(options.hash.current) > 5 ? Number(options.hash.current) - 4 : 1);

        if(i !== 1){
            output += `<li class="page-item disabled"><a class="page-link">....</a></li>`;
        }

        for(; i <= (Number(options.hash.current) + 4) && i <= options.hash.pages; i++){
            if(i === options.hash.current){
                output += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
            }else{
                output += `<li class="page-item"><a href="?page=${i}${type}" class="page-link">${i}</a></li>`;
            }
            if(i === Number(options.hash.current) + 4 && i < options.hash.pages){
                output += `<li class="page-item disabled"><a class="page-link">....</a></li>`;
            }
        }

        if(options.hash.current === options.hash.pages){
            output += `<li class="page-item disabled"><a class="page-link">L</a></li>`;
        }else{
            output += `<li class="page-item"><a href="?page=${options.hash.pages}${type}" class="page-link">L</a></li>`;
        }

        return output;
    }

  },
   handlebars: allowInsecurePrototypeAccess(Handlebars)
});


app.engine('hbs', hbs.engine)
app.set('views', './views')
app.set('view engine', 'hbs')

const port = process.env.PORT || 80


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret : 'jdkbc87632823hbdcjsdc',
  keys: ['auth', 'user'],
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge : 72000000000 ,
    sameSite : true ,
    secure : false
  }
}))
app.use(flash())

//.....admin routes....
app.use('/admin', adminLoginRouter )
app.use('/admin/dashboard',middelware.auth,adminDashboardRouter)
app.use('/admin/property',middelware.auth,adminPropertyRouter)
app.use('/admin/property-type',middelware.auth,adminPropertyTypeRouter)
app.use('/admin/user-role',middelware.auth,adminUserRoleRouter)
app.use('/admin/users',adminUsersRouter)
app.use('/admin/plots',plotsRouter)
//....home.....
app.use('/', homeRouter)
//.......user routers.....
app.use('/user',userLogin);
app.use('/user/dashboard',userDashboardRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.render('error')
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});


app.listen(port,()=>{console.log(`port running at ${port}`)})