import { test, expect } from 'bun:test';
import { setupState, createStore } from './store.mjs';

// Test store creation and middleware integration
test("createStore should initialize with the correct reducers and initial state", () => {
  const { reducers, initialState, middlewares } = setupState();

  const store = createStore(reducers, initialState, middlewares);

  // Verify initial state
  expect(store.getState()).toEqual(initialState);

  // Verify that dispatch updates state correctly
  store.dispatch({ type: 'ADD_TASK', payload: { id: 'test-task', name: 'Test Task' } });
  expect(store.getState().tasks.activeTasks).toEqual([{ id: 'test-task', name: 'Test Task' }]);
});
