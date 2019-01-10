import React from 'react';
import ReactDOM from 'react-dom';
import EqualTemperament from './equaltemperament';

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
      <h1>Tuning</h1>
      {(tuning.type === 'EQUAL_TEMPERAMENT')
        ? <>
            <EqualTemperament tuning={tuning}
                              setEqualTemperament={setTuning}/>
          </>
        : 'Unrecognized tuning'}
    </>
  );
};

export default Tuning;
