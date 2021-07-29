import React from 'react';
import './app.css';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { useContext } from 'react';

import LoginForm from './components/Login';
import Auth from './components/Auth'
import SettingsProvider from './context/Settings';
import { ThemeContext } from './context/Theme';
import ToDo from './components/todo';



function App() {

  const theme = useContext(ThemeContext);
  // console.log(cookie.load('token'))
  return (
    <div className={`App ${theme.mode}`}>
      <LoginForm />
      <Auth capability="delete">
        <p>🙌 hearye hearye, administrator with delete privilege 🙌</p>
        <SettingsProvider>
          <ToDo />
        </SettingsProvider>
      </Auth>
    </div>
  );
}


export default App;
