import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import Context from '../Context';

// existing user authentication
const UserSignIn = () => {
  const context = useContext(Context.AppContext);
  const history = useHistory();

  // state variables
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // Keeps track of changes in the form fields and updates the state values.
  const change = (e) => {
    const value = e.target.value;

    switch (e.target.name) {
      case 'emailAddress':
        setEmailAddress(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  // If user clicks cancel, redirects to the "/" route
  const cancel = (e) => {
    e.preventDefault();
    history.push('/');
  };

  /**
   * When submit is clicked, signs user in and redirects the user to the previous page
   * before sign in route. If the login credentials are wrong, displays an error above
   * the form. If there's an unexpected error, redirects to '/error'.
   */
  const submit = (e) => {
    e.preventDefault();

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(['Sign-in was unsuccessful']);
        } else {
          console.log(user);
          // const { from } = history.location.state || { from: history.goBack() };
          // history.push(from);
        }
      })
      .catch(() => history.push('/error'));
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={submit}>
          <label>Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={change}
            value={emailAddress}
          />
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={change}
            value={password}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={cancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{' '}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
