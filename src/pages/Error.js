import React from 'react';
import { Redirect } from 'react-router-dom';
import PATHS from '../routes/paths';

const Error = ({ location: { state } }) => {
  console.log(state);
  if (!state?.error) return <Redirect to={PATHS.HOME} />;
  return (
    <div>
      <p className="mb-3 ml-4">Something wrong happened!</p>
      {state.error.name === '404' ? (
        <p>404 not found. We could not understand your query.</p>
      ) : (
        <p>
          Try again later or contact the administrator through the contact us
          button.
        </p>
      )}
    </div>
  );
};

export default Error;
