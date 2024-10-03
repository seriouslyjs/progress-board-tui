// Utility function to combine multiple reducers into a single reducer function
export const combineReducers = (reducers) => (state, action) =>
  Object.keys(reducers).reduce(
    (newState, key) => ({
      ...newState,
      [key]: reducers[key](state[key], action, state),
    }),
    {}
  );
