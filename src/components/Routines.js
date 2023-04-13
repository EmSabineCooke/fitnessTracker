


import React, { useState, useEffect } from "react";
import axios from "axios";

const Routines = () => {
  const token = window.localStorage.getItem("Fitness-Trackr-Login")
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");


  useEffect(() => {
    const getRoutines = async () => {
      const response = await axios.get("/api/routines");
      console.log(response.data);
      setRoutines(response.data);
    };
    getRoutines();
  }, []);

  const onChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else {
      setGoal(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const postRoutine = async (token) => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "Fitness-Trackr-Login",
              `${token}`
            )}`,
          },
          body: JSON.stringify({
            routine: {
              name: `${name}`,
              goal: `${goal}`,
              isPublic: true,
            },
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const editRoutine = async (token) => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines/:routineId",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "Fitness-Trackr-Login",
              `${token}`
            )}`,
          },
          body: JSON.stringify({
            routine: {
              name: `${name}`,
              goal: `${goal}`,
            },
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRoutine = async (token) => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines/:routineId",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 
              ${token}`
          }
        },

      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <h1>Routines</h1>
      <ul>
        {routines.map((routine, i) => {
          return (
            <div id="eachRoutine">
              <div key={i}>{routine.name}</div>
              <div>{routine.goal}</div>
              <div>created by {routine.creatorId}</div>
              <button class="button" onClick={() => editRoutine()}>
                Edit
              </button>
              <button class="button" onClick={() => deleteRoutine()}>
                Delete
              </button>
            </div>
          );
        })}
      </ul>
      <form id="newRoutine" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={onChange}
          value={name}
          placeholder="Name"
        ></input>
        <input
          type="text"
          name="goal"
          onChange={onChange}
          value={goal}
          placeholder="Goal"
        ></input>
        <button onClick={postRoutine}>Create</button>
      </form>
    </React.Fragment>
  );
};

export default Routines;