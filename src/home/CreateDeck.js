import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import { createDeck } from ".././utils/api";

function CreateDeck(){
  
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const [newDeck, setNewDeck] = useState({})
  const history = useHistory();
  
  function handleChange(event){
    console.dir(event.target)
   setFormData({
     ...formData,
   [event.target.name] : event.target.value
  })
  }
  
  function handleCancel(){
    history.push("/")
  }

  
  async function handleSubmit(event){
    event.preventDefault()
    const response = await createDeck(formData)
    history.push("/")
    return response
  }
  
  return (
    <main>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
              <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      <h4>Create Deck</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><br/>
        <input type="text" id="dname" name="name" placeholder="Deck Name" onChange={handleChange}/><br/>
        <label htmlFor="description">Description</label><br/>
        <textarea rows="4" cols="50" name="description" placeholder="Brief description of the deck" onChange={handleChange}/><br/>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
      
    </main>
    )
}


export default CreateDeck;