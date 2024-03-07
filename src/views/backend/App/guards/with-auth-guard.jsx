// import { AuthGuard } from './auth-guard';
import { AllRouterGuard } from './auth-guard';

export const withAllRouterGuard = (Component) => (props) => (
  <AllRouterGuard>
    <Component {...props} />
  </AllRouterGuard>
);