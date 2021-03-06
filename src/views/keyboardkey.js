import React from 'react';
import PropTypes from 'prop-types';
import {
  activeColor,
  secondaryBackgroundColor,
  borderColor,
  borderRadius,
  borderWidth
} from '../style/values';

const KeyboardKey = props => {
  const {
    onPress = () => {},
    onRelease = () => {},
    velocity = 0.0
  } = props;
  const isPressed = velocity !== 0.0;
  return(  
    <div onMouseDown={onPress}
         onMouseUp={onRelease}
         onMouseOut={() => {
            if(isPressed) {
              onRelease();
            }
         }}
         style={{
           flexGrow: 1,
           backgroundColor: isPressed ? activeColor : secondaryBackgroundColor,
           borderStyle: 'solid',
           borderWidth,
           borderColor,
           borderRadius
         }}>
    </div>
  );
};

KeyboardKey.propTypes = {
  onPress: PropTypes.func,
  onRelease: PropTypes.func,
  velocity: PropTypes.number
};

export default KeyboardKey;

