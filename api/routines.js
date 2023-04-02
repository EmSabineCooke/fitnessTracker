const express = require('express');
const routinesRouter = express.Router();
const { getAllPublicRoutines,
  getAllRoutines,
      createRoutine,
      getRoutineById,
      updateRoutine,
      destroyRoutine,
      getRoutineActivitiesByRoutineIdActivityIdPair,
      addActivityToRoutine }  = require('../db/')

const requireUser = require('./utils')   


routinesRouter.get('/', async (req, res, next) => {
  try {
    const activities = await getAllRoutines();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});


routinesRouter.post('/', requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  
  try {
    const newRoutine = await createRoutine({creatorId: req.user.id, isPublic, name, goal})

    if (newRoutine) {
      res.send(newRoutine);
    } else {
      next({ 
      name: 'RoutineCreationError', 
      message: 'Sorry, no routine created'
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});


routinesRouter.post('/:routineId/activities', async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId, count, duration } = req.body

  try { 
    const existingPair = await getRoutineActivitiesByRoutineIdActivityIdPair(routineId, activityId)
    const addedActivity =  await addActivityToRoutine({ routineId, activityId, count, duration })
  
    if (addedActivity && !existingPair) {
      res.send(addedActivity);
    } else {
      next({ 
        name: 'AddActivityError', 
        message: 'Sorry, no routine activity added'
        });
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
});


routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const { isPublic, name, goal } = req.body;

  try {
    const routine = await getRoutineById(routineId)

    if (routine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine({id: routine.id, isPublic, name, goal})
      res.send(updatedRoutine)
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update a routine that is not yours'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});


routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;  
  const routine = await getRoutineById(routineId)

  try {
    if (routine && routine.creatorId === req.user.id) {
      const removedRoutine = await destroyRoutine(routine.id)
      res.send(removedRoutine);
    } else {
      next(routine ? { 
      name: 'NotAllowed', 
      message: 'Sorry it was not deleted because you are not the user'
      } : { 
      name: 'NotAvailable', 
      message: 'That routine does not exist'
      });
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
});


module.exports = routinesRouter;