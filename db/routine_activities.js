const client = require("./client");
const { getRoutineById } = require("./routines");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
try {
  const { row: [activity] } = await client.query(`
    INSERT INTO "routine_activities" ("routineId", "activityId", duration, count)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [routineId, activityId, count, duration]);
  return activity;
} catch (error) {
  throw error; 
}

}

async function getRoutineActivityById(id) {
  try {
    const {rows: [routineActivity] } = await client.query(`
      SELECT * FROM "routine_activities"
      WHERE id=$1;
    `, [id]);
    console.log(routineActivity);
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM "routine_activities"
      WHERE "routineId"=$1;
    `, [id]);
    return rows;
    
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  try {
    if (fields.duration) {
      client.query(`
        UPDATE "routine_activities"
        SET duration=$1
        WHERE id=$2;
      `, [fields.duration, id]);
    }

    if (fields.count) {
      client.query(`
      UPDATE "routine_activities"
      SET count=$1
      WHERE id=$2;
    `, [fields.count, id]);
    }
    const routineActivity = await getRoutineActivityById(id);
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try{
    const routineActivity = await getRoutineActivityById(id);
    await client.query(`
      DELETE FROM "routine_activities" WHERE id=$1;
    `, [id]);
    return routineActivity;
  } catch(error) {
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
      const routineActivity = await getRoutineActivityById(routineActivityId);
      const routine = await getRoutineById(routineActivity.routineId);
      if(routine.creatorId === userId) {
        return true;
      } else {
        return false;
      }
  } catch (error) {
    throw error;
  }

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
