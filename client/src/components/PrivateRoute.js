import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../Context';

// wraps routes to restrict access from unauthenticated users
const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(Context.AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        context.authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
