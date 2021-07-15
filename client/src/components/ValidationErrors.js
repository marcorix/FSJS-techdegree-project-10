import React from 'react';

const ValidationErrors = ({ errors }) => {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>
        <ul>
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>;
          })}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
};
export default ValidationErrors;
