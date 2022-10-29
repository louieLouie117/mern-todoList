import React from 'react'
import NewItem from "../components/TodoListComponents/NewItem";



function TodoList(props) {

    console.log("PROPS from list", props.UserRelKey)

    
  return (
    <div>
        <h1>TodoList</h1>
        <NewItem UserRelKeyId={props.UserRelKey}></NewItem>
    </div>
  )
}


export default TodoList
