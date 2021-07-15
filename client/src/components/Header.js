import React, { useContext } from 'react';
import Context from '../Context';

// renders header on all pages
const Header = () => {
  // data
  const context = useContext(Context.AppContext);
  const signedIn = context.authedUser;

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="/">Courses</a>
        </h1>
        <nav>
          {/* if authenticated, displays welcome message to the user and a sign-out button */}
          {signedIn ? (
            <ul className="header--signedin">
              <li>Welcome, {`${signedIn.firstName} ${signedIn.lastName}`}!</li>
              <li>
                <a href="/signout">Sign Out</a>
              </li>
            </ul>
          ) : (
            // if not authenticated, displays Sign Up and Sign In buttons
            <ul className="header--signedout">
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <a href="/signin">Sign In</a>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
