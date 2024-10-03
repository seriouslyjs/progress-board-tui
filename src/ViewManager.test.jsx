import React from 'react';
import { test, expect } from 'bun:test';
import { render } from 'ink-testing-library';
import ViewManager from './ViewManager.jsx';
import stripAnsi from 'strip-ansi';

test("ViewManager should render combined views correctly", () => {
  const { lastFrame } = render(<ViewManager />);

  const output = stripAnsi(lastFrame());

  // Check for Task Manager Dashboard title
  expect(output).toContain("Task Manager Dashboard");

  // Verify that the initial state of tasks, timers, and errors are displayed correctly
  expect(output).toContain("Active Tasks");
  expect(output).toContain("Completed Tasks");
  expect(output).toContain("Timer State");
  expect(output).toContain("Error Logs");

  // Verify that initial states are empty or zero (assuming no tasks are preloaded)
  expect(output).toContain("Total Time Spent: 0s");
  expect(output).toContain("Total Errors: 0");
});
