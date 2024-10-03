import { test, expect, mock } from "bun:test";
import { timerReducer, timerMiddleware } from "./state.mjs";

test("timerReducer should handle START_TIMER action correctly", () => {
  const initialState = {};

  const startTime = Date.now();

  const action = {
    type: "START_TIMER",
    payload: { taskId: "task-001", startTime },
  };

  const newState = timerReducer(initialState, action);

  expect(newState["task-001"]).toEqual({
    startTime,
    endTime: null,
    elapsedTime: 0,
  });
});

test("timerReducer should handle STOP_TIMER action correctly", () => {
  const initialState = {
    "task-001": { startTime: Date.now() - 5000, endTime: null, elapsedTime: 0 },
  };

  const endTime = Date.now();
  const action = {
    type: "STOP_TIMER",
    payload: { taskId: "task-001", endTime },
  };

  const newState = timerReducer(initialState, action);

  expect(newState["task-001"].endTime).toBe(endTime);
  expect(newState["task-001"].elapsedTime).toBeCloseTo(5, 1);  // ~5 seconds
});

test("timerMiddleware should handle ADD_TASK and COMPLETE_TASK actions correctly", () => {
  // Mock dispatch function
  const mockDispatch = mock(() => {});

  // Create a simple mock store object
  const mockStore = {
    dispatch: mockDispatch,
    getState: () => ({}),
  };

  // Create the middleware function
  const next = mock(() => {});
  const actionAddTask = { type: "ADD_TASK", payload: { id: "task-001" } };
  const actionCompleteTask = { type: "COMPLETE_TASK", payload: { id: "task-001" } };

  // Call middleware with ADD_TASK
  timerMiddleware(mockStore)(next)(actionAddTask);

  // Verify that START_TIMER was dispatched
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "START_TIMER",
    payload: { taskId: "task-001", startTime: expect.any(Number) },
  });

  // Call middleware with COMPLETE_TASK
  timerMiddleware(mockStore)(next)(actionCompleteTask);

  // Verify that STOP_TIMER was dispatched
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "STOP_TIMER",
    payload: { taskId: "task-001", endTime: expect.any(Number) },
  });
});
