import React from 'react';
import ReactDOM from 'react-dom';
import EqualTemperament from './equaltemperament';
import {
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Tuning = props => {
  const {
    tuning,
    setTuning
  } = props;
  const setEqualTemperament = tuning => {
    setTuning({...tuning, type: 'EQUAL_TEMPERAMENT'});
  };
  return (
    <>
      <Typography variant="display1">Tuning</Typography>
      {(tuning.type === 'EQUAL_TEMPERAMENT')
        ? <>
            <EqualTemperament tuning={tuning}
                              setEqualTemperament={setTuning}/>
          </>
        : 'Unrecognized tuning'}
    </>
  );
};

Tuning.propTypes = {
  setTuning: PropTypes.func.isRequired,
  tuning: PropTypes.object.isRequired
};

export default Tuning;
