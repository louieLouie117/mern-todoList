const TodoListItem = require("../models/todoListItem.model");
// const jwt = require("jsonwebtoken");

// export an object that is full of methods
module.exports = {
  // Create 
  create (req, res){       
    // add file name to the db
    TodoListItem.create(req.body)
    .then(newTodoListItem => {
        res.json({TodoListItem: newTodoListItem})
    
    })
    .catch((err) => { res.status(400).json(err);})

  },

  getAll (req, res){
    TodoListItem.find(req.body)
    .then(result => res.json({TodoListItem: result}))
    .catch((err) => {res.status(400).json(err);})
    
   },
}