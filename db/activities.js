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

    return activities;
  } catch (error) {
    throw error;
  }
};

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
  let fields  = { name, description };
  if(!name) {
    delete fields.name;
  } 
  if(!description) {
    delete fields.description;
  }

  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

  if (setString.length === 0) {
    return;
  }
      try {
        const { rows: [activity] } = await client.query(`
        UPDATE activities
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `, Object.values(fields));

    return activity;
  } catch (error) {
    throw error;
  }
};

  async function getActivityByName(activityName) {
    try { 
      const { rows: [activity] } = await client.query(`
        SELECT * FROM activities 
        WHERE name=$1;
      `, [activityName]);
      return activity;
      
    } catch (error) {
      throw error; 
    }
  }


module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
    getActivityByName
}
