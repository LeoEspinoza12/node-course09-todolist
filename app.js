// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const hbs = require('express-handlebars')

// const session = require('express-session')
// const FileStore = require('session-file-store')(session)


// var listsRouter = require('./routes/lists');
// var usersRouter = require('./routes/users');


const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/toDo', { useNewUrlParser: true})

var app = express();


const {generateTime, alertThis} = require('./helpers/handlebars-helpers')

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'list', layoutsDir: __dirname + '/views/layouts/', helpers: {generateTime: generateTime, alertThis: alertThis}}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


// session id
app.use(session({
  name: 'session-id',
  secret: '12345-67890',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))


app.use('/', usersRouter);




function auth(req, res, next) {
  console.log(`Response Headers: `, req.headers, ` \n\n `);


  if (!req.session.user) {
    res.statusCode = 403;
    res.render('user/login', {
      'text': 'to do list',
      'nameAlert': 'You have to login first'
    })
  } else {
    if(req.session.user = 'authenticated') {
      next()
    } else {
      res.statusCode = 403;
      res.render('user/login', {
        'text': 'to do list',
        'nameAlert': 'You have to login first'
      })
    }
  }
}

app.use(auth)







//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
app.use('/lists', listsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
