const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getRoutineActivityById } = require('../db/routine_activities');
const { getRoutineById, getUserById, updateRoutineActivity, destroyRoutineActivity } = require('../db');

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

  try {
    const originalRoutineActivity = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(originalRoutineActivity.routineId);
    const user = await getUserById(id);
    if (routine.creatorId !== id) {
      res.send({error: "UserDoesNotMatch", name: "UserDoesNotMatch", message: `User ${user.username} is not allowed to update ${routine.name}`});
    } 
    const updatedRoutine = await updateRoutineActivity(updateR);
    res.send(updatedRoutine);
  } catch ({ name, message }) {
    next({ name, message });
  }

});


// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', async (req, res, next) => {
  const { routineActivityId } = req.params;

  const prefix = 'Bearer ';
  const auth = req.header('authorization');
  const token = auth.slice(prefix.length);
  const { id } =  jwt.verify(token, JWT_SECRET);
  try {
    const routineActivity = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(routineActivity.routineId);
    const user = await getUserById(id);
    if(routine.creatorId === id){
      await destroyRoutineActivity(routineActivityId);
    } else {
      res.status(403);
      res.send({error:"WrongUser", name:"WrongUser", message:`User ${user.username} is not allowed to delete ${routine.name}`});
    }
    res.send(routineActivity);
  } catch (error) {
    
  }
});

module.exports = router;
