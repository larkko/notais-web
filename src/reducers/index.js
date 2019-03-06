import { combineReducers } from 'redux';
import keyboard from './keyboard';
import tuning from './tuning';
import audioSource from './audiosource';

const rootReducer = combineReducers({
  keyboard,
  tuning,
  audioSource
});

export default rootReducer;














