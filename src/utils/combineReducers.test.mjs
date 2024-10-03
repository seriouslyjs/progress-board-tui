import { test, expect } from "bun:test";
import { combineReducers } from "./combineReducers.mjs";

// Mock reducers for testing
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const textReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TEXT":
      return action.payload;
    default:
      return state;
  }
};

test("combineReducers should combine multiple reducers into a single reducer", () => {
  const rootReducer = combineReducers({
    count: counterReducer,
    text: textReducer,
  });

  const initialState = { count: 0, text: "" };

  // Increment count and set text
  const newState = rootReducer(initialState, { type: "INCREMENT" });
  expect(newState).toEqual({ count: 1, text: "" });

  const updatedState = rootReducer(newState, { type: "SET_TEXT", payload: "Hello, World!" });
  expect(updatedState).toEqual({ count: 1, text: "Hello, World!" });
});

test("combineReducers should maintain unrelated state properties", () => {
  const rootReducer = combineReducers({
    count: counterReducer,
    text: textReducer,
  });

  const initialState = { count: 10, text: "Initial Text" };

  // Dispatch an action only affecting the text
  const newState = rootReducer(initialState, { type: "SET_TEXT", payload: "Updated Text" });
  expect(newState).toEqual({ count: 10, text: "Updated Text" });

  // Dispatch an unrelated action
  const finalState = rootReducer(newState, { type: "INCREMENT" });
  expect(finalState).toEqual({ count: 11, text: "Updated Text" });
});
