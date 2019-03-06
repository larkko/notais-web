import React from 'react';
import {
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Oscillator = ({oscillator, setOscillator}) => {

  const toTypeCaption = type => (type === 'SINE') ? 'Sine'
                              : (type === 'SAW') ? 'Sawtooth'
                              : (type === 'SQUARE') ? 'Square'
                              : (type === 'TRIANGLE') ? 'Triangle'
                              : 'Unrecognized';
  const handleChange = event => {
    setOscillator({...oscillator, type: event.target.value});
  };

  return (
    <>
      <Typography variant="headline" gutterBottom>
        Oscillator
      </Typography>
      <Select value={oscillator.type}
              onChange={handleChange}>
        {['SINE', 'SAW', 'SQUARE', 'TRIANGLE'].map(type =>
          <MenuItem value={type} key={type}>
            {toTypeCaption(type)}
          </MenuItem>
        )}
      </Select>
    </>
  );
};

Oscillator.propTypes = {
  oscillator: PropTypes.shape({
    type: PropTypes.string.isRequired
  }).isRequired,
  setOscillator: PropTypes.func.isRequired
};

export default Oscillator;
