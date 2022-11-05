const TodoListItem = require("../models/todoListItem.model");





const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
    console.log("cookies from list controller here!!");
    // let getUserKeyId = res.cookie("userKeyId");
    // console.log("getUserKeyId", getUserKeyId);  
    console.log("get cookie in getAll function------", req.cookies);

    TodoListItem.find(req.body)
    .then(result => res.json({TodoListItem: result}))
    .catch((err) => {res.status(400).json(err);})
    
   },


   getAllByUser (req, res){
    let userId = req.cookies.userId
    console.log('User Id cookie in todo list controller: ', userId)

    TodoListItem.aggregate([ 
      { $match : { relKeyId : userId } },
      // { $limit: 100 },
    
    ]) .then(result =>{ 
          res.json({TodoListItem: result})
          // console.log("result", result);
      
      })
    .catch((err) => {res.status(400).json(err);}) 
   },


}