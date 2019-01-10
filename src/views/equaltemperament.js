import React from 'react';
import ReactDOM from 'react-dom';
import {
  Typography,
  TextField
} from '@material-ui/core';

const EqualTemperament = props => {
  const {
    tuning,
    setEqualTemperament
  } = props;

  const setBaseFrequency = event => {
    const baseFrequency = event.target.value;
    setEqualTemperament({...tuning, baseFrequency});
  };

  const setStepsPerTave = event => {
    const stepsPerTave = event.target.value;
    setEqualTemperament({...tuning, stepsPerTave});
  };

  const setTaveInterval = event => {
    const taveInterval = event.target.value;
    setEqualTemperament({...tuning, taveInterval});
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
                 onChange={setBaseFrequency}/>
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

export default EqualTemperament;
