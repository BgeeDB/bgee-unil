import React from 'react';

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = React.useState(initialState);

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = React.useCallback(() => setState((s) => !s), []);

  return [state, toggle];
};

export default useToggle;
