const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { create  }=require('express-handlebars')
const session = require('express-session') 
const mongoose = require('./mongoose')
const flash = require('express-flash')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const adminLoginRouter = require('./routes/admin/login')
const adminDashboardRouter = require('./routes/admin/dashboard')
const adminPropertyRouter = require('./routes/admin/property')
const adminPropertyTypeRouter = require('./routes/admin/property_type')
const adminUserRoleRouter = require('./routes/admin/user_role')
const adminUsersRouter = require('./routes/admin/users')

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
      loud: (obj) => {return JSON.stringify(obj)}
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

app.use('/', indexRouter)
app.use('/admin', adminLoginRouter )
app.use('/admin/dashboard',adminDashboardRouter)
app.use('/admin/property',adminPropertyRouter)
app.use('/admin/property-type',adminPropertyTypeRouter)
app.use('/admin/user-role',middelware.auth,adminUserRoleRouter)
app.use('/admin/users',adminUsersRouter)

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