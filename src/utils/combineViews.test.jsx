import React from "react";
import { test, expect } from "bun:test";
import { render } from "ink-testing-library";
import stripAnsi from "strip-ansi";
import { combineViews } from "./combineViews.jsx";
import { Box, Text } from "ink";  // Import Ink components for use in mock views

// Corrected mock view components using Ink's Text component
const MockView1 = () => (
  <Box>
    <Text>View 1</Text>
  </Box>
);

const MockView2 = () => (
  <Box>
    <Text>View 2</Text>
  </Box>
);

test("combineViews should render multiple views correctly", () => {
  const CombinedView = combineViews({ view1: MockView1, view2: MockView2 });
  const { lastFrame } = render(<CombinedView />);

  const output = stripAnsi(lastFrame());
  expect(output).toContain("View 1");
  expect(output).toContain("View 2");
});
