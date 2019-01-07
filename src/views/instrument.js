import React from 'react';
import ReactDOM from 'react-dom';
import Keyboard from './keyboard';
import InstrumentController from '../controllers/instrumentcontroller';

class Instrument extends React.Component {

  constructor(props) {
    super(props);
    const { audioContext } = props;
    /*Use 12EDO as a tuning function*/
    const indexToFrequency = index => 440.0 * Math.pow(Math.pow(2, 1/12.0), index);
    
    /*Handles generating audio from presses.*/
    this.instrumentController = new InstrumentController({
      audioContext,
      indexToFrequency
    });
  }

  componentWillUnmount() {
    this.instrumentController.dispose();
  }

  componentDidUpdate(prevProps) {
    const keys = this.props.keyboard.keys;
    const prevKeys = prevProps.keyboard.keys;
    keys.forEach(key => {
      prevKeys.forEach(prevKey => {
        /*Something has changed for this key*/
        if(key.index === prevKey.index && key.velocity !== prevKey.velocity) {
          this.instrumentController.set({
            index: key.index,
            velocity: key.velocity
          });
        }
      });
    });
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <div style={{
               /*Anchor the keyboard at the bottom of the container*/
               position: 'absolute',
               bottom: 0,
               width: '100%'
             }}>
          <Keyboard {...this.props.keyboard}
                    pressKeyboardKey={this.props.pressKeyboardKey}
                    releaseKeyboardKey={this.props.releaseKeyboardKey}/>
        </div>
      </div>
    );
  }
}

export default Instrument;

