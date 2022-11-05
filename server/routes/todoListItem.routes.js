const todoListItemController = require("../controllers/todoListItem.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
  app.post("/api/create-todoListItem", todoListItemController.create);
  app.get("/api/getall-todoListItems", todoListItemController.getAll);
  app.get("/api/getall-todoListItems-byUser", todoListItemController.getAllByUser);

  // authenticated route

  // app.get("/api/getall-todoListItems-byUser", authenticate, todoListItemController.getAllByUser);

  // app.get("/api/users", authenticate, todoListItemController.getAll);
//   app.get("/api/users/loggedin", authenticate, todoListItemController.getLoggedInUser);
};
