import React from 'react';
import ReactDOM from 'react-dom';
import KeyboardKey from './keyboardkey';
import { range } from '../util';

const Keyboard = props => {
  const {
    keys,
    pressKeyboardKey,
    releaseKeyboardKey
  } = props;
  return(  
    <div style={{
        display: 'flex',
        height: '200px'
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

export default Keyboard;

