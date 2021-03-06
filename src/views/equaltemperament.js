import React from 'react';
import {
  Typography,
  TextField,
  InputAdornment
} from '@material-ui/core';
import PropTypes from 'prop-types';

const EqualTemperament = props => {
  const {
    tuning,
    setEqualTemperament
  } = props;

  const setBaseFrequency = event => {
    const baseFrequency = Number(event.target.value);
    if(baseFrequency > 0) {
      setEqualTemperament({...tuning, baseFrequency});
    }
  };

  const setStepsPerTave = event => {
    const stepsPerTave = Number(event.target.value);
    if(stepsPerTave > 0 && Number.isInteger(stepsPerTave)) {
      setEqualTemperament({...tuning, stepsPerTave});
    }
  };

  const setTaveInterval = event => {
    const taveInterval = Number(event.target.value);
    if(taveInterval >= 1) {
      setEqualTemperament({...tuning, taveInterval});
    }
  };

  return (
    <>
      <Typography variant="headline">
        Equal temperament
      </Typography>
      <TextField label="Base frequency"
                 value={tuning.baseFrequency}
                 type="number"
                 margin="normal"
                 variant="outlined"
                 onChange={setBaseFrequency}
                 InputProps={{
                   endAdornment:
                     <InputAdornment position="end">Hz</InputAdornment>
                 }}/>
      <TextField label="Steps per 'tave"
                 value={tuning.stepsPerTave}
                 type="number"
                 margin="normal"
                 variant="outlined"
                 onChange={setStepsPerTave}/>
      <TextField label="'Tave interval size"
                 value={tuning.taveInterval}
                 type="number"
                 margin="normal"
                 variant="outlined"
                 onChange={setTaveInterval}/>
    </>
  );
};

EqualTemperament.propTypes = {
  setEqualTemperament: PropTypes.func.isRequired,
  tuning: PropTypes.shape({
    baseFrequency: PropTypes.number.isRequired,
    stepsPerTave: PropTypes.number.isRequired,
    taveInterval: PropTypes.number.isRequired,
  }).isRequired
};

export default EqualTemperament;
