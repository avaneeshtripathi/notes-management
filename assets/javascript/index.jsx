import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './reducer';
import Container from './container';
require('../stylesheets/style.sass');

const store = createStore(Reducer);

class Main extends React.Component{
  render () {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};

ReactDOM.render(<Main />,  document.getElementById("main"));
