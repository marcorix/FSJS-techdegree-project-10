import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context';

const UserSignOut = () => {
  const context = useContext(Context.AppContext);

  // calls signout method
  useEffect(() => {
    context.actions.signOut();
  }, [context.actions]);

  return <Redirect to="/" />;
};
export default UserSignOut;
