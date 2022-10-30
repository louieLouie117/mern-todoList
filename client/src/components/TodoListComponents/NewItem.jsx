import React from 'react'
import { useState } from 'react'

const NewItem = (props) =>{


  let relKeyId = props.UserRelKeyId;

  console.log("New item component props", relKeyId)


  // user information
  const [item, setItem] = useState("");

  const submitItemHandler = e => {
    e.preventDefault();
    console.log("add button was click")

    const NewItemData = {
      userRelKey: relKeyId,
      item: item,

    }

    console.log("item data", NewItemData)

  }




  return (
    <div>
        <h2>Add a item {item}</h2>
        <form action="" onSubmit={e => {submitItemHandler(e)}}>
          <input type="text" placeholder='item' onChange={ e => {setItem(e.target.value)}}/>
          <button>add</button>
        </form>
    </div>
  )
}


export default NewItem
