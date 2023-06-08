import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './ContextProvider/DataProvider';



export default function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);


  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/sign-in" />
      }
    />
  );
}