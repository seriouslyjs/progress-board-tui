import React from 'react';
import { test, expect } from 'bun:test';
import { render } from 'ink-testing-library';
import stripAnsi from 'strip-ansi';
import { ErrorView, ErrorSummaryView } from './views.jsx';
import { StateContext } from '@utils/state-manager.mjs';  // Import StateContext for wrapping

// Mock state data for errors
const mockState = {
  errors: [
    { taskId: "task-001", error: "Sample error 1", timestamp: Date.now() },
    { taskId: "task-002", error: "Sample error 2", timestamp: Date.now() },
  ],
};

test("ErrorView should render all errors correctly", () => {
  const { lastFrame } = render(
    <StateContext.Provider value={mockState}>
      <ErrorView />
    </StateContext.Provider>
  );

  // Strip ANSI codes from the output and then check the content
  const cleanOutput = stripAnsi(lastFrame());
  expect(cleanOutput).toContain("Sample error 1");
  expect(cleanOutput).toContain("Sample error 2");
  expect(cleanOutput).toContain("Task ID: task-001");
  expect(cleanOutput).toContain("Task ID: task-002");
});

test("ErrorSummaryView should display the total number of errors", () => {
  const { lastFrame } = render(
    <StateContext.Provider value={mockState}>
      <ErrorSummaryView />
    </StateContext.Provider>
  );

  const cleanOutput = stripAnsi(lastFrame());
  expect(cleanOutput).toContain("Total Errors: 2");
});
