import {
  SetKeyboardRange,
  PressKeyboardKey,
  ReleaseKeyboardKey
} from '../actions/keyboard';
import { range } from '../util';

const emptyKeys = ({from, to}) =>
  range({from, to})
       .map(index => ({
         index,
         velocity: 0.0
        }));

const initialState = {
  keys: emptyKeys({from: -15, to: 15})
};

const keyboard = (state = initialState, action) => {
  switch(action.type) {
    case SetKeyboardRange: {
      const { from, to } = action;
      const keys = emptyKeys({from, to});
      return {...state, keys};
    }
    case PressKeyboardKey: {
      const { index, velocity } = action;
      const keys = state.keys.map(key => ({
        ...key,
        velocity: index === key.index ? velocity : key.velocity
      }));
      return {...state, keys};
    }
    case ReleaseKeyboardKey: {
      const { index } = action;
      const keys = state.keys.map(key => ({
        ...key,
        velocity: index === key.index ? 0.0 : key.velocity
      }));
      return {...state, keys};
    }
    default: {
      return state;
    }
  }
};

export default keyboard;














