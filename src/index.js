import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {
  connect,
  Provider
} from 'react-redux';
import rootReducer from './reducers';
import {
  pressKeyboardKey,
  releaseKeyboardKey
} from './actions/keyboard';
import {
  setTuning
} from './actions/tuning';
import Instrument from './views/instrument';
import { backgroundColor } from './style/values';
import InstrumentController from './controllers/instrumentcontroller';
import { tuningToFrequencyFunction } from './model/tuning';
import PropTypes from 'prop-types';

const store = createStore(rootReducer);

class App extends React.Component {
 
  constructor(props) {
    super(props);
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    const afterDelay = (func, ms) => setTimeout(func, ms);
    const indexToFrequency = tuningToFrequencyFunction(props.tuning);
    /*Handles generating audio from presses.*/
    this.instrumentController = new InstrumentController({
      audioContext: this.audioContext,
      indexToFrequency,
      afterDelay
    });
  }

  componentWillUnmount() {
    this.instrumentController.dispose();
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
                    afterDelay={this.afterDelay}
                    instrumentController={this.instrumentController}/>
      </div>
    );
  }
}

App.propTypes = {
  tuning: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => {
  return {
    pressKeyboardKey: ({index, velocity}) => {
      return dispatch(pressKeyboardKey({index, velocity}));
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







