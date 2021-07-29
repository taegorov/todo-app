import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from './context/Theme';
import AuthProvider from './context/Auth'


import App from './app.js';

function Main() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
