// Error middleware following redux-like pattern
export const errorMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      console.log(`Error Added: Task ID: ${action.payload.taskId}, Error: ${action.payload.error}`);
      break;

    case 'REMOVE_ERROR':
      console.log(`Error Removed: Index ${action.payload.index}`);
      break;

    case 'CLEAR_ERRORS':
      console.log("All errors cleared.");
      break;

    case 'COMPLETE_TASK':
      // Automatically log a completion error if a task is marked complete without issues
      if (!store.getState().errors.find((err) => err.taskId === action.payload.id)) {
        store.dispatch({
          type: 'ADD_ERROR',
          payload: { taskId: action.payload.id, error: 'Task completed without any errors.' },
        });
      }
      break;

    default:
      break;
  }

  // Pass the action to the next middleware
  return next(action);
};

// State management logic for the errors slice
export const errorReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return [
        ...state,
        { taskId: action.payload.taskId, error: action.payload.error, timestamp: Date.now() },
      ];

    case 'REMOVE_ERROR':
      return state.filter((_, index) => index !== action.payload.index);

    case 'CLEAR_ERRORS':
      return [];

    default:
      return state;
  }
};
