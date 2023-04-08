import React from 'react';
import getAllRoutinesByUser from "../../db/routines"

export default Profile = () => {
  const myRoutines = async () => {
    //this part is not done but the return is done
    await getAllRoutinesByUser({ currentUserName })
  }
  return (
    <>
      <header>
        <div>My Routines</div>
        <button id="newRoutine">Create A New Routine</button></header>

      {
        myRoutines.map(routine => (
          <div class="allmyroutines" key={routine.id}>
            <div>
              <h2>{routine.name}</h2>
              <p>
                {routine.activities}
              </p>
            </div>
            <Link to="/routine/`${routine.id}`" state={{ routine: routine }}>see details</Link>
            <button type="button" onClick={() => deleteRoutine(routine.id)}>delete this routine</button>
          </div>
        ))

      }
    </>
  )
}