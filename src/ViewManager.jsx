import React, { useEffect, useMemo } from 'react';
import { Box, Text } from 'ink';
import { StateContext, DispatchContext } from '@utils/state-manager.mjs';  // Import contexts from the state manager
import { createStore, setupState } from '@utils/store.mjs';  // Import store and setup functions from utilities
import { combineViews } from '@utils/combineViews.jsx';
import { ActiveTasksView, CompletedTasksView } from '@middleware/tasks/views.jsx';
import { TimerView, TimerSummaryView } from '@middleware/timers/views.jsx';
import { ErrorView, ErrorSummaryView } from '@middleware/errors/views.jsx';
import { taskMiddleware } from '@middleware/tasks/state.mjs';

// Combine all views
const views = {
  ActiveTasksView,
  CompletedTasksView,
  TimerView,
  TimerSummaryView,
  ErrorView,
  ErrorSummaryView,
};

const CombinedView = combineViews(views, {});

const ViewManager = () => {
  const { reducers, middlewares, initialState } = setupState();

  // Create the store using reducers, initial state, and middleware
  const store = useMemo(() => createStore(reducers, initialState, middlewares), []);

  // Initialize task middleware to populate the initial tasks state
  useEffect(() => {
    taskMiddleware.init(store.dispatch);  // Initialize tasks using config
  }, [store.dispatch]);

  return (
    <StateContext.Provider value={store.getState()}>
      <DispatchContext.Provider value={store.dispatch}>
        <Box flexDirection="column" padding={1}>
          <Text bold color="blue">
            Task Manager Dashboard
          </Text>
          <CombinedView />
        </Box>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default ViewManager;
