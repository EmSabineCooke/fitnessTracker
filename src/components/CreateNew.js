import React, { useState } from "react";
import createRoutine from "../../db/routines"
import Axios from "axios";

export const CreateRoutine = () => {

  //Im still working on this part but the return is done

  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [goal, setGoal] = useState("")
  const [isPublic, setIsPublic] = useState("")


  const back = () => {
    navigate("/profile")
  }

  const postRoutine = async (event) => {
    event.preventDefault()
    const TOKEN = localStorage.getItem("Fitness-Trackr-Login")
    try {
      const response = await fetch("api/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description
          }
        })
      });
      const userId = TOKEN
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }



  const handleChange = (event) => {
    if (event.target.placeholder === "name") {
      setName(event.target.value)
    }
    if (event.target.placeholder === "description") {
      setDescription(event.target.value)
    }
    if (event.target.placeholder === "goal") {
      setGoal(event.target.value)
    }
    if (event.target.placeholder === "isPublic") {
      setIsPublic(event.target.value)
    }
  }



  return (
    <>

      <form id="newRoutineForm">
        <h3>New Routine</h3>
        <label>
          <input type='text' value={name} placeholder='name' onChange={handleChange}></input>
        </label>
        <label>
          <input type='text' value={description} placeholder='description' onChange={handleChange}></input>
        </label>
        <label>
          <input type='text' value={goal} placeholder='goal' onChange={handleChange}></input>
        </label>
        <label>
          <input type='text' value={isPublic} placeholder='make this routine public?' onChange={handleChange}></input>
        </label>
        <button id="submit" onClick={postRoutine}>Submit</button>
      </form>
      <button id='back' onClick={back}>back</button>
    </>

  )
}