const mongoose = require("mongoose");

const TodoListItemSchema = new mongoose.Schema(
    
    {
       relKeyId:{
        type:String,
        required: [true, "{PATH} is required"],
        minlength: [2, "{PATH} must be at least {MINLENGTH}"]
        },

        item:{
            type:String,
            required: [true, "{PATH} is required"],
            minlength: [2, "{PATH} must be at least {MINLENGTH}"],
            
        },
},  {timestamps: true});

const TodoListItem = mongoose.model("TodoListItem", TodoListItemSchema);

module.exports = TodoListItem;

