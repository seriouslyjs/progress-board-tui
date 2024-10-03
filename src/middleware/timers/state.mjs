// Timer middleware following redux-like pattern
export const timerMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'ADD_TASK':
      // Automatically start a timer when a task is added
      store.dispatch({
        type: 'START_TIMER',
        payload: { taskId: action.payload.id, startTime: Date.now() },
      });
      break;

    case 'COMPLETE_TASK':
      // Automatically stop the timer when the task is completed
      store.dispatch({
        type: 'STOP_TIMER',
        payload: { taskId: action.payload.id, endTime: Date.now() },
      });
      break;

    default:
      break;
  }

  // Pass the action to the next middleware
  return next(action);
};

// State management logic
export const timerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        [action.payload.taskId]: {
          startTime: action.payload.startTime,
          endTime: null,
          elapsedTime: 0,
        },
      };
    case 'STOP_TIMER':
      const { startTime } = state[action.payload.taskId] || {};
      if (!startTime) return state;
      const endTime = action.payload.endTime;
      const elapsedTime = (endTime - startTime) / 1000;
      return {
        ...state,
        [action.payload.taskId]: {
          ...state[action.payload.taskId],
          endTime,
          elapsedTime,
        },
      };
    default:
      return state;
  }
};
