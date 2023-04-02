const express = require('express');
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', async (req, res, next) => {
  const { routineActivityId } = req.params;
  const { routineId, activityId, duration, count } = req.body;

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

  try {
    const originalRoutineActivity = await getRoutineActivityById(req.params);

    if (originalRoutineActivity.routineActivityId === routineActivityId) {
      const updatedRoutineActivity = await updateRoutineActivity(routineActivityId, updateR)
      res.send(updatedRoutineActivity);
    }
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
