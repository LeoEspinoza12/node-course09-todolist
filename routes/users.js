var express = require('express');
const bodyParser = require('body-parser');
var usersRouter = express.Router();

const Users = require('../models/users')

usersRouter.use(bodyParser.json())

// setting the layout for the users
usersRouter.all('/*', (req, res, next)=> {
  req.app.locals.layout = 'user';
  next();
})





// setting the users registration
usersRouter.route('/')
.get((req, res, next) => {
  res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
      res.render('user/login', {'text': 'to do list'})
 
})
.post((req, res, next) => {

  var username = req.body.username;
    var password = req.body.password;

  if(!req.session.user) {
    Users.findOne({username: req.body.username})
    .then((user) => {
      if(!user) {
        var nameAlert = "Username does not exists!"
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/html');
        res.render('user/login', {
          text: 'to do lists',
          nameAlert: nameAlert, 
          username: username, 
          password: password
        })
        
      } else if (user.password !== req.body.password) {
        var pwdAlert = "Invalid password!"
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/html');
        res.render('user/login', {
          text: 'to do lists',
          pwdAlert: pwdAlert,
          username: username,
          password: password
        })

      } else if (user.username == req.body.username && user.password === req.body.password){
        req.session.user = 'authenticated';
          res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
          res.redirect('/lists')
      }
    })
    .catch((err) => next(err)); 
  } else {
    res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
        res.redirect('/lists')
  }
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
usersRouter.route('/register')
.get((req, res, next) => {
  res.render('user/register', {'text': 'to do list'});
})
.post((req, res, next) => {
  var username = req.body.username;
    var password = req.body.password;

    Users.findOne({username: username})
    .then((user) => {
      if(user != null) {
        return false
      } else {
        return Users.create(req.body)
      }
    })
    .then((user) => {
      if(user) {
        res.statusCode = 200  
        res.setHeader('Content-Type', 'text/html');
        res.render('user/login', {'text': 'to do list', 'nameAlert': 'Account created!'})
      } else {
        var nameAlert = "Username already exists!"
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/html');
        res.render('user/register', {
              text: 'to do lists',
              nameAlert: nameAlert,
              username: username,
              password: password
        })
      }
    }, (err) => next(err))
  .catch((err) => next(err))
})





usersRouter.get('/logout', (req, res, next) => {
  if (req.session){
    req.session.destroy();
      res.clearCookie('session-id');
        res.redirect('/')
  } else {
    var err = new Error('You are not logged in');
      next(err)
  }
})





module.exports = usersRouter;









