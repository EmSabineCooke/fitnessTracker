const client = require('./client');

async function createActivity({ name, description }) {
  try {
      const { rows: [ activity ] } = await client.query(`
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
      const {rows: activities} = await client.query(`
        SELECT *
        FROM activities;
        `);

        return activities;
  } catch (error) {
    throw error;
  }
};


async function getActivityById(activityId) {
  try {
      const { rows: [ activity ]  } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=$1;
        `, [activityId]);

        return activity;
  } catch (error) {
    throw error;
  }
};


async function updateActivity({id, name, description}){
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


module.exports = {  
     createActivity,
     getAllActivities,
     getActivityById,
     updateActivity }
