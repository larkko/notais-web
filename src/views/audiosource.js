import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography
} from '@material-ui/core';
import Oscillator from './oscillator';

const AudioSource = props => {
  const {
    audioSource,
    setAudioSource
  } = props;
  const setOscillator = oscillator => {
    setAudioSource({type: 'OSCILLATOR', oscillator});
  };
  return (
    <>
      <Typography variant="display1">Audio source</Typography>
      {(audioSource.type === 'OSCILLATOR')
        ? <Oscillator oscillator={props.audioSource.oscillator}
                      setOscillator={setOscillator}/>
        : 'Unrecognized audio source'}
    </>
  );
};

AudioSource.propTypes = {
  setAudioSource: PropTypes.func.isRequired,
  audioSource: PropTypes.object.isRequired
};

export default AudioSource;
