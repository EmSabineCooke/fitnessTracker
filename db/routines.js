const client = require('./client');

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
      const { rows: [ routine ] } = await client.query(`
        INSERT INTO routines("creatorId", "isPublic", name, goal) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [creatorId, isPublic, name, goal]);

        return routine;
  } catch (error) {
    throw error;
  }
};


async function getRoutinesWithoutActivities(){
  try {
      const { rows } = await client.query(`
        SELECT * 
        FROM routines;
        `);

        return rows;
  } catch (error) {
    throw error;
  }
};


async function getAllRoutines() {
  try {
      const { rows: routines } = await client.query(`
        SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users on users.id=routines."creatorId"
        `)

      for (let routine of routines) {
      const {rows: activities} = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id as "routineActivityId"
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId"=activities.id
        WHERE "routineId" IN ($1)
        `, [routine.id]);
        routine.activities = activities
      }

      return routines;
  } catch (error) {
    throw error;
  }
};


async function getRoutineById(routineId) {
  try {
      const { rows: [ routine ] } = await client.query(`
        SELECT *
        FROM routines
        WHERE id=$1;
        `, [routineId]);

        return routine;
  } catch (error) {
    throw error;
  }
}


async function getAllPublicRoutines() {
  try {
      const { rows: routines } = await client.query(`
        SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users on users.id=routines."creatorId"
        WHERE "isPublic"=true
        `)

      for (let routine of routines) {
      const {rows: activities} = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId"=activities.id
        WHERE "routineId" IN ($1)
        `, [routine.id]);
        routine.activities = activities
        }

      return routines;
  } catch (error) {
    throw error;
  }
};


async function getAllRoutinesByUser({username}) {
  try {
      const {rows: routines} = await client.query(`
        SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users on users.id=routines."creatorId"
        WHERE username='${username}'
        `)

      for (let routine of routines) {
      const {rows: activities} = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id as "RoutineActivityId"
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId"=activities.id
        WHERE "routineId" IN ($1)
        `, [routine.id]);
        routine.activities = activities
      }

      return routines;
  } catch(error) {
    throw error;
  }
};


async function getPublicRoutinesByUser({username}) {
  try {
      const {rows: routines} = await client.query(`
        SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users on users.id=routines."creatorId"
        WHERE username='${username}' AND "isPublic"=true
        `)
  
      for (let routine of routines) {
      const {rows: activities} = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId"=activities.id
        WHERE "routineId" IN ($1)
        `, [routine.id]);
        routine.activities = activities
        console.log("ROUTINE", routine);
      }
      console.log("ROUTINES", routines);
      return routines;
  } catch(error) {
    throw error;
  }
};


async function getRoutineByRoutineId(routineId) {
  try {
      const {rows: activities} = await client.query(`
        SELECT activities.*, routine_activities.id, routine_activities.duration, routine_activities.count
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId"=activities.id
        WHERE routine_activities."routineId"=${routineId} 
        `);

        return activities;
  } catch(error) {
    throw error;
  }
};


async function getPublicRoutinesByActivity({activityId}) {
  try {
      const {rows: routines} = await client.query(`
        SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users on routines."creatorId"=users.id
        WHERE "isPublic"=true;
        `)
   
      const updatedRoutines = await Promise.all(routines.map(async function(routine) {
      const activitiesList = await getRoutineByRoutineId(routine.id) 
      routine.activities = activitiesList

      await activitiesList.filter(async function(activity) {
      return activity.id === activityId
      })
      return routine;
      }))
      return updatedRoutines;
  
  } catch(error) {
    throw error;
  }
};


async function updateRoutine({ id, isPublic, name, goal }) {
const fields  = { isPublic, name, goal }

  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ routine ] } = await client.query(`
      UPDATE routines
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    if (isPublic === undefined) {
      routine.isPublic = false
    }

    return routine;
  } catch (error) {
    throw error;
  }
};


async function destroyRoutine(id) {
  try {
      await client.query(`
        DELETE from routine_activities
        WHERE "routineId"=$1;
        `, [id])

      const { rows: [ routine ] } = 
      await client.query(`
        DELETE from routines
        WHERE id = $1
        RETURNING *;
        `, [id])

      return routine;
  } catch(error) {
    throw error;
  }
};


module.exports = {  
    createRoutine,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getRoutineById,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    updateRoutine,
    destroyRoutine }