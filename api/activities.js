const express = require('express');
const router = express.Router();
const { getAllActivities, createActivity, updateActivity, getActivityById, getActivityByName } = require('../db/activities.js');
const { getAllPublicRoutines } = require('../db/routines');

router.use((req, res, next) => {
  console.log("A request is being made to /activities");
  next();
});

router.get('/:activityId/routines', async (req, res, next) => {
  const { name, description } = req.body;
  const { activityId } = req.params;
  try {
    const nameactivity = await getActivityByName(name);
    if (nameactivity) {
      next({
        name: 'activity taken',
        message: 'this activity already exists'
      });
    }
    const activity = getAllPublicRoutines(req.params)
    res.send({ activity });
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
  const { name, description } = req.body;
  try {
    const _activity = await getActivityByName(name);
    if (_activity) {
      next({
        name: 'ActivityAlreadyExists',
        message: 'Activity already exists!'
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

  try {
    const originalActivity = await getActivityById(req.params);

    if (originalActivity.activityId === activityId) {
      const updatedActivity = await updateActivity(activityId, updateFields)
      res.send(updatedActivity);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }

});

module.exports = router;