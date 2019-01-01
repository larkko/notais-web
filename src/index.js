import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {
  connect,
  Provider
} from 'react-redux';
import rootReducer from './reducers';
import {
  PressKeyboardKey,
  pressKeyboardKey,
  ReleaseKeyboardKey,
  releaseKeyboardKey
} from './actions/keyboard';
import Instrument from './views/instrument';

console.log('Notais v. 0.0.1');

const store = createStore(rootReducer);

const App = props => {
  return (
    <Instrument {...props}/>
  );
};

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => {
  return {
    pressKeyboardKey: ({index, velocity}) => {
      return dispatch(pressKeyboardKey({index, velocity}))
    },
    releaseKeyboardKey: index => dispatch(releaseKeyboardKey(index))
  };
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById("root")
);







