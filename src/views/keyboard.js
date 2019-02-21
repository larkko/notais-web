import React from 'react';
import KeyboardKey from './keyboardkey';
import PropTypes from 'prop-types';

const Keyboard = props => {
  const {
    keys,
    pressKeyboardKey,
    releaseKeyboardKey
  } = props;
  return(  
    <div style={{
        display: 'flex',
        height: '200px',
        width: '100%'
      }}>
      {keys.map(key =>
        <KeyboardKey onPress={() => pressKeyboardKey({
                                index: key.index,
                                velocity: 1.0
                              })}
                     onRelease={() => releaseKeyboardKey(key.index)}
                     {...key}
                     key={key.index}/>
      )}
    </div>
  );
};

Keyboard.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    velocity: PropTypes.number
  })).isRequired,
  pressKeyboardKey: PropTypes.func.isRequired,
  releaseKeyboardKey: PropTypes.func.isRequired
};

export default Keyboard;

