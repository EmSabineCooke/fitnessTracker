const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getRoutineActivityById } = require('../db/routine_activities');
const { getRoutineById, getUserById, updateRoutineActivity } = require('../db');

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', async (req, res, next) => {
  const { routineActivityId } = req.params;
  const { routineId, activityId, duration, count } = req.body;
  const prefix = 'Bearer ';
  const auth = req.header('authorization');
  const token = auth.slice(prefix.length);
  const { id } =  jwt.verify(token, JWT_SECRET);

  const updateR = {};

  if (activityId) {
    updateR.activityId = activityId;
  }
  if (routineId) {
    updateR.routineId = routineId;
  }
  if (duration) {
    updateR.duration = duration;
  }
  if (count) {
    updateR.count = count;
  }

  updateR.id = routineActivityId;
  console.log("UPDATR", updateR);

  try {
    const originalRoutineActivity = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(originalRoutineActivity.routineId);
    const user = await getUserById(id);
    if (routine.creatorId !== id) {
      res.send({error: "UserDoesNotMatch", name: "UserDoesNotMatch", message: `User ${user.username} is not allowed to update ${routine.name}`});
    } 
    const updatedRoutine = await updateRoutineActivity(updateR);
    console.log(updatedRoutine);
    res.send(updatedRoutine);
  } catch ({ name, message }) {
    next({ name, message });
  }

});


// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', async (req, res, next) => {
  const { routineActivityId } = req.params;
  try {
    const routineActivityId = await destroyRoutineActivity(req.params);
    res.send(routineActivityId);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
