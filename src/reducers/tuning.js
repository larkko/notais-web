import {
  SetTuning
} from '../actions/tuning';

/*Use 12EDO as a reasonable initial state.*/
const initialState = {
  type: 'EQUAL_TEMPERAMENT',
  baseFrequency: 440.0,
  stepsPerTave: 12,
  taveInterval: 2.0
};

const tuning = (state = initialState, action) => {
  switch(action.type) {
    case SetTuning: {
      const { tuning } = action;
      return tuning;
    }
    default: {
      return state;
    }
  }
};

export default tuning;
