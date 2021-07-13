import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Context = React.createContext();

/**
 * Context provider to keep track of logged user, also provides 'Sign in' and
 * 'Sign out' actions that will update the state accordingly. Creates a cookie
 * to keep user data stored.
 */
export class Provider extends Component {
  state = {
    authUser: Cookies.getJSON('authUser') || null,
    encodedCredentials: Cookies.getJSON('encodedCredentials') || null,
  };

  /**
   * Signs in the user with provided credentials and updates the state
   * and creates cookie to store authentication.
   *
   * @param {String} encodedCredentials
   * @returns 'authUser' object with user details
   */
  signIn = async (emailAddress, password) => {
    const encodedCredentials = btoa(`${emailAddress}:${password}`);
    let status;
    let authUser;
    await axios
      .get('http://localhost:5000/api/users', {
        headers: { Authorization: `Basic ${encodedCredentials}` },
      })
      .then((response) => {
        authUser = response.data;
        this.setState({ authUser, encodedCredentials });
        const cookieOptions = { expires: 1 };
        Cookies.set('authUser', JSON.stringify(authUser), cookieOptions);
        Cookies.set(
          'encodedCredentials',
          JSON.stringify(encodedCredentials),
          cookieOptions
        );
        status = response.status;
      })
      .catch((err) => {
        status = err.response.status;
      });
    return status;
  };

  /**
   * Signs out the user and resets state. Also removes the cookie data where
   * user authentication data is stored.
   */
  signOut = async () => {
    this.setState(() => {
      return { authUser: null, encodedCredentials: null };
    });
    Cookies.remove('authUser');
    Cookies.remove('encodedCredentials');
  };

  render() {
    const { authUser, encodedCredentials } = this.state;
    const value = {
      authUser,
      encodedCredentials,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order function to wrap given component with Consumer to provide
 * context props and actions.
 *
 * @param {Component} Component to be wrapped
 * @returns 'Component' that is wrapped
 */
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
