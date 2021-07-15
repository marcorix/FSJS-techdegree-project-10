import React from 'react';
import { Link } from 'react-router-dom';

// renders when user authorization checks fail
const Forbidden = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oops! You can't access this page.</p>
        <Link className="button button-secondary" to="/">
          Home
        </Link>
      </div>
    </main>
  );
};
export default Forbidden;
