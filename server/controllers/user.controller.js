const User = require("../models/user.model");
const TodoListItem = require("../models/todoListItem.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// export an object that is full of methods
module.exports = {
  register(req, res) {

    User.findOne({ email: req.body.email })
    .then((users) => {
        // res.json(users)
       if(users){
           console.log("*******************");
            console.log("This user",users, "was found in the db");
            console.log("Registration Denied!!! email already exists");
            return res.status(422).json({ errors: [{ user: "Registration Denied!!!" }] });
         }
         
    
        const user = new User(req.body);
             user.save()
            .then(() => {
            res.json({ msg: "success!", user: user });
            console.log("Success!!!");
   
        
      })
   
      .catch((err) => res.status(400).json(err));
   


    
    })
    .catch((err) => res.json(err));
  },

  login(req, res) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ msg: "invalid login attempt 1" });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              if (passwordIsValid) {
            
            
                // add user key id to cookies
                res.cookie('userId', user._id)
                // res.send('Cookies added');

                res.cookie(
                    "usertoken",
                    jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                    {
                      httpOnly: true,
                      maxAge: 120000, // Session will time out.
                      
                    }
                  )
                  .json({ msg: "success!" });
                  
                  // console.log("user logged id", user._id);
      
              } else {
                res.status(400).json({ msg: "invalid login attempt 2" });
              }
            })
            .catch((err) =>
              res.status(400).json({ msg: "invalid login attempt 3" })
            );
        }
      })
      .catch((err) => res.json(err));

      
  },





  logout(req, res) {

   console.log("All cookies-----", req.cookies);
   console.log("userId:", req.cookies.userId);

  //  console.log("token cookies-----", res.cookie("usertoken", jwt.sign({ _id: "usertoken" }, process.env.JWT_SECRET), {}));


    res.cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0,
      })
      .json({ msg: "ok" });

      
 

},






  // logout2(req, res) {
  //   res.clearCookie("usertoken");
  //   res.json({ msg: "usertoken cookie cleared" });
  // },

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  getAll(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  },

  getOne(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },








};


