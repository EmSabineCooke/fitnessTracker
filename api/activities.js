const express = require('express');
const router = express.Router();
const { getAllActivities, createActivity, updateActivity, getActivityById, getActivityByName } = require('../db/activities.js');
const { getAllPublicRoutines } = require('../db/routines');
const { getPublicRoutinesByActivity } = require('../db/routines');

router.use((req, res, next) => {
  console.log("A request is being made to /activities");
  next();
});

router.get('/:activityId/routines', async (req, res, next) => {
  const { name, description } = req.body;
  const { activityId } = req.params;
  try {
    const activityExists = await getActivityById(activityId);
    if (!activityExists) {
      res.send({error: "ActivityDoesNotExist", name: "ActivityDoesNotExist", message: `Activity ${activityId} not found`});
    }
    const activity = await getPublicRoutinesByActivity(activityId);
    res.send(activity);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    const _activity = await getActivityByName(name);
    if (_activity) {
      res.send({
        error: "ActivityAlreadyExists",
        name: 'ActivityAlreadyExists',
        message: `An activity with name ${name} already exists`
      });
    }

    const activity = await createActivity(req.body);
    res.send(activity);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }
  updateFields.id = activityId;


  try {
      const activityExists = await getActivityById(activityId);
      const nameExists = await getActivityByName(name);
      if(activityExists){
        if(nameExists) {
          res.send({error: "ActivityNameExists", name: "ActivityNameExists", message: `An activity with name ${name} already exists`});
        }

      const updatedActivity = await updateActivity(updateFields);
      res.send(updatedActivity);
      } else {
        res.send({error: "Activity Does Not Exist", name: "ActivityDoesNotExist", message: `Activity ${activityId} not found`});
      }
  } catch ({ name, message }) {
    next({ name, message });
  }

});

module.exports = router;