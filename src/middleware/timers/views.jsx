import React from 'react';
import { Text, Box } from 'ink';
import { useAppState } from '@utils/state-manager.mjs';

// Timer view using Ink
export const TimerView = () => {
  // Ensure the hook is at the top level
  const state = useAppState();

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Timer State
      </Text>
      {Object.entries(state.timers).map(([taskId, timer]) => (
        <Box key={taskId} marginY={0.5}>
          <Text>
            Task: {taskId}, Elapsed Time: {timer.elapsedTime || 0}s
          </Text>
        </Box>
      ))}
    </Box>
  );
};

// Additional Timer Summary View
export const TimerSummaryView = () => {
  const { timers } = useAppState() || { timers: {} };  // Safely destructure the `timers` slice with a fallback

  const totalElapsedTime = Object.values(timers || {}).reduce((acc, timer) => acc + (timer.elapsedTime || 0), 0);

  return (
    <Box marginTop={1}>
      <Text color="yellow" bold>
        Total Time Spent: {totalElapsedTime}s
      </Text>
    </Box>
  );
};