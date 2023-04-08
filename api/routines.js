const express = require('express');
const routinesRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getAllPublicRoutines,
  getAllRoutines,
      createRoutine,
      getRoutineById,
      updateRoutine,
      destroyRoutine,
      addActivityToRoutine, 
      getUserById,
      getRoutineActivitiesByRoutine}  = require('../db/')

const requireUser = require('./utils')   


routinesRouter.get('/', async (req, res, next) => {
  try {
    const activities = await getAllRoutines();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});


routinesRouter.post('/', async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('authorization');
  if(!auth) {
    res.status(403);
    res.send({error:"NotLoggedIn", name:"NotLoggedIn", message:"You must be logged in to perform this action"});
  } else {
    const token = auth.slice(prefix.length);
    const { id } =  jwt.verify(token, JWT_SECRET);
    const { isPublic, name, goal } = req.body;
    const fields = {
      creatorId: id,
      isPublic: isPublic,
      name: name,
      goal: goal
    }
  try {
    if(id) {
      const newRoutine = await createRoutine(fields);
      res.send(newRoutine);
    } 
    } catch ({ name, message }) {
    next({ name, message });
  }
}
});


routinesRouter.post('/:routineId/activities', async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId, count, duration } = req.body;

  try { 
    const routineActExists = await getRoutineActivitiesByRoutine({id: routineId});
    let exists = false;

    for(let i = 0; i < routineActExists.length; i++) {
      if (routineActExists[i].activityId === activityId) {
        exists = true;
      }
    }
    if(exists) {
      res.send({error: "RoutineActivityDuplicate", name: "RoutineActivityDuplicate", message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`});
    } else {
        const result = await addActivityToRoutine({routineId, activityId, count, duration});
        res.send(result);
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
});


routinesRouter.patch('/:routineId', async (req, res, next) => {
  const { routineId } = req.params;
  const { isPublic, name, goal } = req.body;
  const prefix = 'Bearer ';
  const auth = req.header('authorization');
  if(!auth) {
    res.status(403);
    res.send({error:"NotLoggedIn", name:"NotLoggedIn", message:"You must be logged in to perform this action"});
  } else {
    const token = auth.slice(prefix.length);
    const { id } =  jwt.verify(token, JWT_SECRET);
    try {
      const user = await getUserById(id);
      const routine = await getRoutineById(routineId);
      if(routine.creatorId === id) {
        const result = await updateRoutine({id, isPublic, name, goal});
        res.send(result);
      } else {
        res.status(403);
        res.send({error: "UnathorizedChange", name: "UnauthorizedChange", message:`User ${user.username} is not allowed to update ${routine.name}`});
      }
    } catch ({name, message}) {
      next({name, message});
    }
  }
});


routinesRouter.delete('/:routineId', async (req, res) => {
  const { routineId } = req.params;  
  const prefix = 'Bearer ';
  const auth = req.header('authorization');
  if(!auth) {
    res.status(403);
    res.send({error:"NotLoggedIn", name:"NotLoggedIn", message:"You must be logged in to perform this action"});
  } else {
    const token = auth.slice(prefix.length);
    const { id } =  jwt.verify(token, JWT_SECRET);
    try {
        const user = await getUserById(id);
        const routine = await getRoutineById(routineId);
        if(routine.creatorId === id) {
        const result = await destroyRoutine(routineId);
        res.send(result);
        } else {
          res.status(403);
          res.send({error: "IncorrectUser", name: "IncorrectUser", message: `User ${user.username} is not allowed to delete ${routine.name}`});
        }
    } catch ({name, message}) {
      next({name, message});
    }
  }
});


module.exports = routinesRouter;