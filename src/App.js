//router
import LayoutsRoute from './router/layouts-route';
import { AuthProvider } from './views/backend/Main/ContextProvider/DataProvider';

//scss files
import './assets/scss/backend.scss';
import './assets/css/custom.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LayoutsRoute />
      </AuthProvider>
    </div>
  );
}

export default App;
