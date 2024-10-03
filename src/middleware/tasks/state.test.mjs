import { test, expect, mock } from "bun:test";
import { taskReducer, taskMiddleware } from "./state.mjs";

// Mock configuration for testing
const mockConfig = {
  tasks: [
    {
      taskId: "global-analysis",
      taskName: "Global Analysis",
      metadata: {
        owner: "Data Science Team",
        priority: "High",
      },
      subtasks: [
        {
          taskId: "noun-extraction",
          taskName: "Noun Extraction",
          metadata: {
            owner: "NLP Subteam",
            priority: "Medium",
          },
        },
        {
          taskId: "verb-extraction",
          taskName: "Verb Extraction",
          metadata: {
            owner: "NLP Subteam",
            priority: "Medium",
          },
        },
      ],
    },
  ],
};

// Test taskReducer with ADD_TASK and COMPLETE_TASK actions
test("taskReducer should handle ADD_TASK action correctly", () => {
  const initialState = { activeTasks: [], completedTasks: [] };

  // Action to add a task
  const addTaskAction = {
    type: "ADD_TASK",
    payload: {
      id: "task-001",
      name: "Sample Task",
      priority: "High",
    },
  };

  // Use the reducer to add the task
  const newState = taskReducer(initialState, addTaskAction);
  expect(newState.activeTasks.length).toBe(1);
  expect(newState.activeTasks[0].name).toBe("Sample Task");
});

test("taskReducer should handle COMPLETE_TASK action correctly", () => {
  const initialState = {
    activeTasks: [{ id: "task-001", name: "Sample Task" }],
    completedTasks: [],
  };

  // Action to complete a task
  const completeTaskAction = {
    type: "COMPLETE_TASK",
    payload: { id: "task-001", completedAt: new Date().toISOString() },
  };

  // Use the reducer to complete the task
  const newState = taskReducer(initialState, completeTaskAction);
  expect(newState.activeTasks.length).toBe(0);
  expect(newState.completedTasks.length).toBe(1);
});

test("taskMiddleware should initialize tasks correctly from the config", () => {
  // Mock dispatch function
  const mockDispatch = mock(() => {});

  // Initialize the middleware with a mock configuration
  const initialTasks = taskMiddleware.init(mockDispatch, mockConfig);

  // Check if dispatch was called with the correct task actions
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "ADD_TASK",
    payload: {
      id: "global-analysis",
      name: "Global Analysis",
      owner: "Data Science Team",
      priority: "High",
      subtasks: [
        { id: "noun-extraction", name: "Noun Extraction", owner: "NLP Subteam", priority: "Medium" },
        { id: "verb-extraction", name: "Verb Extraction", owner: "NLP Subteam", priority: "Medium" },
      ],
    },
  });
});
