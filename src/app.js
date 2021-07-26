import React from 'react';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import ToDo from './components/todo';

export default class App extends React.Component {
  render() {
    return (
      <ToDo />
    );
  }
}
