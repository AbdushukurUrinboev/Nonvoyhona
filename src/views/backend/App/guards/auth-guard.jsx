import { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from '../../Main/ContextProvider/DataProvider';

import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios';
import { USERS_URL } from '../../../../API';

export const AllRouterGuard = (props) => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const currentPath = history.location.pathname;
  const { children } = props;
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const directorAllowedRoutes = ['/customers', '/storage', '/staff', '/orders', '/calculation', '/daily-tasks', '/sale', '/nasiya', '/expenses', '/daromat', '/xamkor', '/plans', '/attandance', '/users'];
  const managerAllowedRoutes = ['/customers', '/storage', '/staff', '/orders', '/calculation', '/daily-tasks', '/sale', '/nasiya', '/expenses', '/daromat', '/xamkor', '/plans', '/attandance', '/users'];
  const developerAllowedRoutes = ['/customers', '/storage', '/staff', '/orders', '/calculation', '/daily-tasks', '/sale', '/nasiya', '/expenses', '/daromat', '/xamkor', '/plans', '/attandance', '/users'];
  const accountantAllowedRoutes = ['/customers', '/storage', '/staff', '/orders', '/calculation', '/daily-tasks', '/sale', '/nasiya', '/expenses', '/daromat', '/xamkor', '/plans', '/attandance', '/users'];
  const yopuvchiAllowedRoutes = ['/daily-tasks']; // yopuvchi, parkash, xamirkash
  // const parkashAllowedRoutes = ['/daily-tasks'];
  // const xamirkashAllowedRoutes = ['/daily-tasks'];
  const taminotchiAllowedRoutes = ['/storage', '/storage-add'];
  const sellerAllowedRoutes = ['/sale']

  // SidebarStyle.jsx ichida ham sidebar allowed pagelarni olganman. agar allowed pagelar uzgarsa u yerni ham uzgartiraman

  useEffect(
    () => {
      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }
      
      // if (!isAuthenticated){
      //   history.replace("/auth/sign-in");
      //   return;
      // }
      ignore.current = true;
      const thisUserRole = currentUser.role;
      if (thisUserRole === "rahbar") {
        if (directorAllowedRoutes.includes(currentPath)) {
          setChecked(true);
        } else {
          history.replace(directorAllowedRoutes[0])            
        }
      } else if (thisUserRole === "menejer") {
        if (managerAllowedRoutes.includes(currentPath)) {
          setChecked(true);
        } else {
          history.replace(managerAllowedRoutes[0])
        }
      } else if (thisUserRole === "buhgalter") {
        if (accountantAllowedRoutes.includes(currentPath)) {
          setChecked(true);
        } else {
          history.replace(accountantAllowedRoutes[0])            
        }
      } else if (thisUserRole === "yopuvchi" || thisUserRole === "parkash" || thisUserRole === "xamirkash") {
        if (yopuvchiAllowedRoutes.includes(currentPath)) {
          setChecked(true);
        } else {
          history.replace(yopuvchiAllowedRoutes[0]);            
        }
      } else if (thisUserRole === "taminotchi") {
        if (taminotchiAllowedRoutes.includes(currentPath)) {
          setChecked(true);
        } else {
          history.replace(taminotchiAllowedRoutes[0]);
        }
      } else if (thisUserRole === "sotuvchi") {
        if (sellerAllowedRoutes.includes(currentPath)) {
          setChecked(true);
        } else {
          history.replace(sellerAllowedRoutes[0])           
        }
      } else if (thisUserRole === "developer") {
        setChecked(true);
      }
      // }
    },
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

// AuthGuard.propTypes = {
//   children: PropTypes.node
// };
AllRouterGuard.propTypes = {
  children: PropTypes.node
};
