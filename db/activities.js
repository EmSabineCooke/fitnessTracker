const client = require('./client');

async function createActivity({ name, description }) {
  try {
    const { rows: [activity] } = await client.query(`
        INSERT INTO activities(name, description) 
        VALUES($1, $2)
        RETURNING *;
        `, [name, description]);

    return activity;
  } catch (error) {
    throw error;
  }
};


async function getAllActivities() {
  try {
    const { rows: activities } = await client.query(`
        SELECT *
        FROM activities;
        `);

<<<<<<<< < Temporary merge branch 1
    async function getActivityById(id) { }

    async function getActivityByName(name) { }

    // used as a helper inside db/routines.js
    async function attachActivitiesToRoutines(routines) { }

    async function updateActivity({ id, ...fields }) {
      // don't try to update the id
      // do update the name and description
      // return the updated activity
    }

    module.exports = {
      getAllActivities,
      getActivityById,
      getActivityByName,
      attachActivitiesToRoutines,
      createActivity,
      updateActivity,
    };
=========
        return activities;
  } catch (error) {
    throw error;
  }
};
>>>>>>>>> Temporary merge branch 2


    async function getActivityById(activityId) {
      try {
        const { rows: [activity] } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=$1;
        `, [activityId]);

        return activity;
      } catch (error) {
        throw error;
      }
    };


    async function updateActivity({ id, name, description }) {
      try {
        const { rows: [activity] } = await client.query(`
        UPDATE activities
        SET name='${name}', description='${description}'
        WHERE id = ${id}
        RETURNING *;
        `)

        return activity;
      } catch (error) {
        throw error;
      }
    };


<<<<<<<<< Temporary merge branch 1
    module.exports = {
      createActivity,
      getAllActivities,
      getActivityById,
      updateActivity
    }
=========
module.exports = {
     createActivity,
     getAllActivities,
     getActivityById,
     updateActivity }
>>>>>>>>> Temporary merge branch 2
