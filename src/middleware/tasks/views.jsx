import React from 'react';
import { Box, Text } from 'ink';
import { useAppState } from '@utils/state-manager.mjs';  // Import custom hook for state access

// Active Tasks View using Ink
export const ActiveTasksView = () => {
  const { tasks } = useAppState();  // Access the `tasks` slice directly

  return (
    <Box flexDirection="column" marginTop={1} paddingLeft={1}>
      <Text bold color="cyan">
        Active Tasks
      </Text>
      <Box flexDirection="column">
        {tasks.activeTasks.map((task) => (
          <Box key={task.id} marginY={0.5}>
            <Text>
              <Text color="green">Task:</Text> {task.name} <Text color="magenta">Priority:</Text> {task.priority}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Completed Tasks View using Ink
export const CompletedTasksView = () => {
  const { tasks } = useAppState();  // Access the `tasks` slice directly

  return (
    <Box flexDirection="column" marginTop={1} paddingLeft={1}>
      <Text bold color="cyan">
        Completed Tasks
      </Text>
      <Box flexDirection="column">
        {tasks.completedTasks.map((task) => (
          <Box key={task.id} marginY={0.5}>
            <Text>
              <Text color="green">Task:</Text> {task.name} <Text color="magenta">Completed at:</Text>{' '}
              {new Date(task.completedAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
