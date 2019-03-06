import React from 'react';
import Keyboard from './keyboard';
import Tuning from './tuning';
import { tuningToFrequencyFunction } from '../model/tuning';
import PropTypes from 'prop-types';

class Instrument extends React.Component {

  componentDidUpdate(prevProps) {
    const keys = this.props.keyboard.keys;
    const controller = this.props.instrumentController;
    const prevKeys = prevProps.keyboard.keys;
    keys.forEach(key => {
      prevKeys.forEach(prevKey => {
        /*Something has changed for this key*/
        if(key.index === prevKey.index && key.velocity !== prevKey.velocity) {
          controller.set({
            index: key.index,
            velocity: key.velocity
          });
        }
      });
    });
    controller.setIndexToFrequency(
      tuningToFrequencyFunction(this.props.tuning)
    );
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Tuning tuning={this.props.tuning}
                setTuning={this.props.setTuning}/>
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

Instrument.propTypes = {
  instrumentController: PropTypes.object.isRequired,
  keyboard: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number.isRequired,
      velocity: PropTypes.number.isRequired,
    })).isRequired
  }).isRequired,
  ...Tuning.propTypes
};

export default Instrument;

