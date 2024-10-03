import { createContext, useReducer, useMemo, useContext } from 'react';
import { combineReducers } from '@utils/combineReducers.mjs';
import { taskReducer, taskMiddleware } from '@middleware/tasks/state.mjs';
import { timerReducer, timerMiddleware } from '@middleware/timers/state.mjs';
import { errorReducer, errorMiddleware } from '@middleware/errors/state.mjs';

// Contexts for state and dispatch
export const StateContext = createContext();
export const DispatchContext = createContext();

// Combine reducers and middleware functions for central management
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

  // Define initial state
  const initialState = {
    tasks: { activeTasks: [], completedTasks: [] },
    timers: {},
    errors: [],
  };

  return { reducers, middlewares, initialState };
};

// Create the store object with getState and dispatch
export const createStore = (reducers, initialState, middlewares) => {
  const rootReducer = combineReducers(reducers);
  const [state, baseDispatch] = useReducer(rootReducer, initialState);

  // Enhance dispatch with middleware logic
  const enhancedDispatch = middlewares.reduceRight(
    (next, middleware) => middleware({ getState: () => state, dispatch: next })(next),
    baseDispatch
  );

  return { getState: () => state, dispatch: enhancedDispatch };
};

// Custom hooks to access state and dispatch
export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);
