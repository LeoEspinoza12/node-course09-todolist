var express = require('express');
const bodyParser = require('body-parser');
var usersRouter = express.Router();

usersRouter.use(bodyParser.json())

// setting the layout for the users
usersRouter.all('/*', (req, res, next)=> {
  req.app.locals.layout = 'user';
  next();
})





// setting the users registration
usersRouter.route('/')
.get((req, res, next) => {
    // res.send('<h1>Sample text</h1>')
  res.render('user/register', {'text': 'post response'});
})
.post((req, res, next) => {

  res.render('user/login', {'text': 'post response'});
})
.put((req, res, next) => {
  res.statusCode = 403
  res.render('user/error', {'text': 'You are not allowed for this transaction!'});
})
.delete((req, res, next) => {
  res.statusCode = 403
  res.render('user/error', {'text': 'You are not allowed for this transaction!'});
})







// setting the users login
usersRouter.route('/login')
.get((req, res, next) => {
  res.render('user/login', {'text': 'post response'});
})
.post((req, res, next) => {
  res.render('list/index', {'text': 'post response'});
})
.put((req, res, next) => {
  res.statusCode = 403
  res.render('user/error', {'text': 'You are not allowed for this transaction!'});
})
.delete((req, res, next) => {
  res.statusCode = 403
  res.render('user/error', {'text': 'You are not allowed for this transaction!'});
})



module.exports = usersRouter;
