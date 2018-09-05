var express = require('express');
const bodyParser = require('body-parser');
var listsRouter = express.Router();

const ToDoList = require('../models/toDoList')



listsRouter.use(bodyParser.json())

// setting the layouts for all listRouter routes
listsRouter.all('/*', (req, res, next) => {
  req.app.locals.layout = 'index';
  next();
})


listsRouter.route('/')
.get((req, res, next) => {
  // // res.send('<h1>This is the Index GET</h1>')
  res.render('lists/index', {'text': 'sample'})
})
.post((req, res, next) => {
    ToDoList.create(req.body)
      .then((toDo) => {
        if (toDo) {
          ToDoList.find({})
            .then((lists) => {
              // lists.forEach( (list) => {
              //   console.log(`this is the lists: ${list.todolist}`);
                res.render('lists/sample', {lists: lists})

            })
        }
      console.log(`You have entered new list ${toDo}`)
    });

})
  



.put((req, res, next) => {
  // res.send('<h1>This is the Index PUT</h1>')
  // res.render('lists/edit', {'text': 'sample'})
})
.delete((req, res, next) => {
  // res.send('<h1>This is the Index DELETE</h1>')
  // res.render('lists/index', {'text': 'sample'})
})


// listsRouter.route('/:id')
//   .get((req, res, next) => {
//     // res.send('<h1>This is the Index ID GET</h1>')
//     // res.render('lists/error', {'text': 'Your are not allowed for GET ID'})
//   })
//   .post((req, res, next) => {
//     // res.send('<h1>This is the Index ID POST</h1>')
//     // res.render('lists/error', {'text': 'Your are not allowed for POST ID'})
//   })
//   .put((req, res, next) => {
//     // res.send('<h1>This is the Index ID PUT</h1>')
//     // res.render('lists/edit', {'text': 'sample'})
//   })
//   .delete((req, res, next) => {
//     // res.send('<h1>This is the Index ID DELETE</h1>')
//     // res.render('lists/index', {'text': 'sample'})
//   })



module.exports = listsRouter;
