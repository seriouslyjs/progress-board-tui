import { test, expect, mock } from "bun:test";
import { errorReducer, errorMiddleware } from "./state.mjs";

// Test the errorReducer with various action types
test("errorReducer should handle ADD_ERROR action correctly", () => {
  const initialState = [];

  // Action to add an error
  const addErrorAction = {
    type: "ADD_ERROR",
    payload: {
      taskId: "task-001",
      error: "Sample error occurred.",
    },
  };

  // Use the reducer to add the error
  const newState = errorReducer(initialState, addErrorAction);
  expect(newState.length).toBe(1);
  expect(newState[0].taskId).toBe("task-001");
  expect(newState[0].error).toBe("Sample error occurred.");
});

test("errorReducer should handle REMOVE_ERROR action correctly", () => {
  const initialState = [
    { taskId: "task-001", error: "Sample error 1", timestamp: 162526 },
    { taskId: "task-002", error: "Sample error 2", timestamp: 162527 },
  ];

  // Action to remove the first error
  const removeErrorAction = {
    type: "REMOVE_ERROR",
    payload: { index: 0 },
  };

  // Use the reducer to remove the error
  const newState = errorReducer(initialState, removeErrorAction);
  expect(newState.length).toBe(1);
  expect(newState[0].taskId).toBe("task-002");
});

test("errorReducer should handle CLEAR_ERRORS action correctly", () => {
  const initialState = [
    { taskId: "task-001", error: "Sample error 1", timestamp: 162526 },
    { taskId: "task-002", error: "Sample error 2", timestamp: 162527 },
  ];

  // Action to clear all errors
  const clearErrorsAction = {
    type: "CLEAR_ERRORS",
  };

  // Use the reducer to clear errors
  const newState = errorReducer(initialState, clearErrorsAction);
  expect(newState.length).toBe(0);
});

test("errorMiddleware should handle COMPLETE_TASK action correctly", () => {
  // Mock store and dispatch
  const mockState = { errors: [] };
  const mockDispatch = mock(() => {});
  const mockStore = { getState: () => mockState, dispatch: mockDispatch };

  // Action to complete a task without any errors
  const completeTaskAction = {
    type: "COMPLETE_TASK",
    payload: { id: "task-001" },
  };

  // Use the middleware to handle the action
  errorMiddleware(mockStore)(() => {})(completeTaskAction);

  // Check if ADD_ERROR was dispatched due to task completion without errors
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "ADD_ERROR",
    payload: { taskId: "task-001", error: "Task completed without any errors." },
  });
});
