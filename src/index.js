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
import {
  setTuning
} from './actions/tuning';
import Instrument from './views/instrument';
import { backgroundColor } from './style/values';

console.log('Notais v. 0.0.1');

const store = createStore(rootReducer);

class App extends React.Component {
 
  constructor(props) {
    super(props);
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.afterDelay = (func, ms) => setTimeout(func, ms);
  }

  componentWillUnmount() {
    this.audioContext.close();
  }

  render() {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        padding: '1em',
        boxSizing: 'border-box',
        backgroundColor: backgroundColor
      }}>
        <Instrument {...this.props}
                    audioContext={this.audioContext}
                    afterDelay={this.afterDelay}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => {
  return {
    pressKeyboardKey: ({index, velocity}) => {
      return dispatch(pressKeyboardKey({index, velocity}))
    },
    releaseKeyboardKey: index => dispatch(releaseKeyboardKey(index)),
    setTuning: tuning => dispatch(setTuning(tuning))
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







