const port = 8000;
// const cors = require("cors")
// const express = require("express")
const dbName = "todoList-db";
const session = require('express-session')

require("dotenv").config();
const express = require("express"),
  cookieParser = require("cookie-parser"),
  cors = require("cors");

require("./config/mongoose.config")(dbName);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app.use(cors());
app.use(session({
  secret: 'thisisthesk',
  resave: false,
  saveUninitialized: false,

}))


require("./routes/user.routes")(app);
require("./routes/todoListItem.routes")(app);






app.listen(port, ()=>{console.log(`Listening to ${port} for REQ and RES`);})