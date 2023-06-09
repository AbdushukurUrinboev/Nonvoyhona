

import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './ContextProvider/DataProvider';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated, authError } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth/sign-in', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;




