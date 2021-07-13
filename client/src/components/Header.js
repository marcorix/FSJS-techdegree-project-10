import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A Header component to be displayed on all pages. If user is signed in, hides Sign up and
 * Sign in, instead shows Welcome message and Sign out.
 */
export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/" replace>
              Courses
            </Link>
          </h1>
          <nav>
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
