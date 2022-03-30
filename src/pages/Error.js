import React from 'react';

const Error = ({ location: { state } }) => (
  <div>
    <p className="mb-3 ml-4">Something wrong happened!</p>
    {state?.error?.message === 404 ? (
      <p>404 not found. We could not understand your query.</p>
    ) : (
      <p>
        Try again later or contact the administrator through the contact us
        button.
      </p>
    )}
  </div>
);

export default Error;
