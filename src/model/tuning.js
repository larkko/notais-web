
export const tuningToFrequencyFunction = tuning => {
  const { type } = tuning;
  if(type === 'EQUAL_TEMPERAMENT') {
    const {
      baseFrequency,
      stepsPerTave,
      taveInterval
    } = tuning;
    return index => {
      return baseFrequency * Math.pow(Math.pow(taveInterval, 1.0/stepsPerTave), index);
    };
  }  else {
    /*Tuning not in known tuning types*/
    return undefined;
  }
};



