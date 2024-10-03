import React from 'react';
import { Box, Text } from 'ink';
import { useAppState } from '@utils/state-manager.mjs';  // Centralised state hook

// Error Logs View using Ink and centralised state access
export const ErrorView = () => {
  const { errors } = useAppState();  // Access the `errors` slice directly

  return (
    <Box flexDirection="column" marginTop={1} paddingLeft={1}>
      <Text bold color="red">
        Error Logs
      </Text>
      <Box flexDirection="column">
        {errors.map((error, index) => (
          <Box key={index} marginY={0.5}>
            <Text>
              <Text color="yellow">Task ID:</Text> {error.taskId} <Text color="magenta">Error:</Text> {error.error}{" "}
              <Text color="cyan">Timestamp:</Text> {new Date(error.timestamp).toLocaleString()}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Error Summary View using Ink and centralised state access
export const ErrorSummaryView = () => {
  const { errors } = useAppState();  // Access the `errors` slice directly

  return (
    <Box marginTop={1}>
      <Text color="red" bold>
        Total Errors: {errors.length}
      </Text>
    </Box>
  );
};
