import React from "react";
import { test, expect } from "bun:test";
import { render } from "ink-testing-library";
import stripAnsi from "strip-ansi";
import { TimerView, TimerSummaryView } from "./views.jsx";
import { StateContext } from "@utils/state-manager.mjs";  // Import StateContext for wrapping

// Mock state data for timers
const mockState = {
  tasks: { activeTasks: [], completedTasks: [] },  // Add empty tasks slice
  timers: {
    "task-001": { startTime: Date.now() - 10000, endTime: Date.now(), elapsedTime: 10 },
    "task-002": { startTime: Date.now() - 20000, endTime: Date.now(), elapsedTime: 20 },
  },
  errors: [],  // Add empty errors slice
};

test("TimerView should render all timers correctly", () => {
  const { lastFrame } = render(
    <StateContext.Provider value={mockState}>
      <TimerView />
    </StateContext.Provider>
  );

  // Strip ANSI codes from the output
  const cleanOutput = stripAnsi(lastFrame());

  // Check if timers are displayed correctly
  expect(cleanOutput).toContain("Task: task-001, Elapsed Time: 10s");
  expect(cleanOutput).toContain("Task: task-002, Elapsed Time: 20s");
});

test("TimerSummaryView should display the total elapsed time", () => {
  const { lastFrame } = render(
    <StateContext.Provider value={mockState}>
      <TimerSummaryView />
    </StateContext.Provider>
  );

  const cleanOutput = stripAnsi(lastFrame());
  expect(cleanOutput).toContain("Total Time Spent: 30s");
});
