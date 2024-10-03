import React from 'react';
import { Box } from 'ink';  // Using Ink's Box component for CLI layouts

// Combine views from multiple middlewares into a single component using Ink
export const combineViews = (views, props) => {
  const CombinedView = () => (
    <Box flexDirection="column">
      {Object.values(views).map((ViewComponent, index) => (
        <Box key={index} marginBottom={1}>
          <ViewComponent {...props} />
        </Box>
      ))}
    </Box>
  );
  return CombinedView;
};
