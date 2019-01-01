
export const SetKeyboardRange = 'SET_KEYBOARD_RANGE';

export const setKeyboardRange = ({from, to}) => ({
  type: SetKeyboardRange,
  from,
  to
});

export const PressKeyboardKey = 'PRESS_KEYBOARD_KEY';

export const pressKeyboardKey = ({index, velocity}) => ({
  type: PressKeyboardKey,
  index,
  velocity
});

export const ReleaseKeyboardKey = 'RELEASE_KEYBOARD_KEY';

export const releaseKeyboardKey = index => ({
  type: ReleaseKeyboardKey,
  index
});







