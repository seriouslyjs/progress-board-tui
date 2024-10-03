import { loadYamlConfig } from '@utils/loadConfig.mjs';
import path from 'path';

// Define the path to the tasks configuration file
const configPath = path.resolve('./src/config/tasks.yaml');

// Task middleware following redux-like pattern
export const taskMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ADD_TASK') {
    console.log(`Task Added: ${action.payload.name}`);
  }

  return next(action);
};

// State management logic for the tasks slice
export const taskReducer = (state = { activeTasks: [], completedTasks: [] }, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        activeTasks: [...state.activeTasks, action.payload],
      };
    case 'COMPLETE_TASK':
      const remainingTasks = state.activeTasks.filter((task) => task.id !== action.payload.id);
      return {
        ...state,
        activeTasks: remainingTasks,
        completedTasks: [...state.completedTasks, action.payload],
      };
    default:
      return state;
  }
};

// Helper function to parse configuration and create initial tasks
const initializeTasksFromConfig = (config) => {
  const initialTasks = [];

  // Loop through the task definitions in the config
  config.tasks.forEach((task) => {
    initialTasks.push({
      id: task.taskId,
      name: task.taskName,
      subtasks: task.subtasks ? task.subtasks.map((subtask) => ({
        id: subtask.taskId,
        name: subtask.taskName,
        ...subtask.metadata,
      })) : [],
      ...task.metadata,
    });
  });

  return initialTasks;
};

// Initialization function to populate initial tasks from configuration
taskMiddleware.init = (dispatch) => {
  // Load the configuration file
  const config = loadYamlConfig(configPath);
  if (config) {
    const initialTasks = initializeTasksFromConfig(config);

    // Dispatch an action to add all the initial tasks
    initialTasks.forEach((task) => {
      dispatch({
        type: 'ADD_TASK',
        payload: task,
      });
    });
  }
};
