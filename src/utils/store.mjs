import { combineReducers } from '@utils/combineReducers.mjs';
import { taskReducer, taskMiddleware } from '@middleware/tasks/state.mjs';
import { timerReducer, timerMiddleware } from '@middleware/timers/state.mjs';
import { errorReducer, errorMiddleware } from '@middleware/errors/state.mjs';

export const setupState = () => {
  // Combine the middleware reducers
  const reducers = {
    tasks: taskReducer,
    timers: timerReducer,
    errors: errorReducer,
  };

  // Register middleware
  const middlewares = [
    taskMiddleware,
    timerMiddleware,
    errorMiddleware,
  ];

  // Define initial state for all slices
  const initialState = {
    tasks: { activeTasks: [], completedTasks: [] },
    timers: {},  // Ensure timers state is an empty object, not undefined
    errors: [],
  };

  return { reducers, middlewares, initialState };
};

// Pure store creation function
export const createStore = (reducers, initialState, middlewares) => {
  let state = initialState;
  const listeners = [];
  const rootReducer = combineReducers(reducers);

  // Base dispatch function
  const baseDispatch = (action) => {
    state = rootReducer(state, action);
    listeners.forEach((listener) => listener());
  };

  // Enhanced dispatch with middleware
  const enhancedDispatch = middlewares.reduceRight(
    (next, middleware) => middleware({ getState: () => state, dispatch: next })(next),
    baseDispatch
  );

  return {
    getState: () => state,
    dispatch: enhancedDispatch,
    subscribe: (listener) => listeners.push(listener),
    unsubscribe: (listener) => listeners.filter((l) => l !== listener),
  };
};
