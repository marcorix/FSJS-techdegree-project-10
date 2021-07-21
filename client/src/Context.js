import React, { Component } from 'react';
import Cookies from 'js-cookie';

// import api request methods
import Data from './Data';

// create context instance using the Context API
export const AppContext = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authedUser: Cookies.getJSON('authedUser') || null,
  };

  // method authenticates current existing user.
  // persists credentials in global state.
  // sets cookie
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);

    if (user !== null) {
      this.setState(() => {
        user.emailAddress = emailAddress;
        user.password = password;
        return {
          authedUser: user,
        };
      });
      console.log(user);
      Cookies.set('authedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  // removes current user's credentials from state.
  // removes cookie
  signOut = () => {
    this.setState(() => {
      return { authedUser: null };
    });

    Cookies.remove('authedUser');
  };

  render() {
    const { authedUser } = this.state;
    const value = {
      authedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export const Consumer = AppContext.Consumer;

// eslint-disable-next-line
export default { AppContext };
