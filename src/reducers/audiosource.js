import {
  SetAudioSource
} from '../actions/audiosource';

/*Use sine-wave oscillator as the default audio source.*/
const initialState = {
  type: 'OSCILLATOR',
  oscillator: {
    type: 'SINE'
  }
};

const audioSource = (state = initialState, action) => {
  switch(action.type) {
    case SetAudioSource: {
      const { audioSource } = action;
      return audioSource;
    }
    default: {
      return state;
    }
  }
};

export default audioSource;
