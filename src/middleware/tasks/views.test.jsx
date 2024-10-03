import React from "react";
import { test, expect } from "bun:test";
import { render } from "ink-testing-library";
import stripAnsi from "strip-ansi";  // Import strip-ansi for cleaning the output
import { ActiveTasksView, CompletedTasksView } from "./views.jsx";
import { StateContext } from "@utils/state-manager.mjs";

// Mock state data
const mockState = {
  tasks: {
    activeTasks: [{ id: "task-001", name: "Sample Task", priority: "High" }],
    completedTasks: [{ id: "task-002", name: "Completed Task", completedAt: new Date().toISOString() }],
  },
};

test("ActiveTasksView should render active tasks correctly", () => {
  const { lastFrame } = render(
    <StateContext.Provider value={mockState}>
      <ActiveTasksView />
    </StateContext.Provider>
  );

  // Strip ANSI codes from the output and then check the content
  const cleanOutput = stripAnsi(lastFrame());
  expect(cleanOutput).toContain("Sample Task");
  expect(cleanOutput).toContain("Priority: High");
});

test("CompletedTasksView should render completed tasks correctly", () => {
  const { lastFrame } = render(
    <StateContext.Provider value={mockState}>
      <CompletedTasksView />
    </StateContext.Provider>
  );

  // Strip ANSI codes from the output and then check the content
  const cleanOutput = stripAnsi(lastFrame());
  expect(cleanOutput).toContain("Completed Task");
  expect(cleanOutput).toContain("Completed at:");
});
