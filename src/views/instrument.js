import React from 'react';
import ReactDOM from 'react-dom';
import Keyboard from './keyboard';

class Instrument extends React.Component {
  render() {
    return (
      <Keyboard {...this.props.keyboard}
                pressKeyboardKey={this.props.pressKeyboardKey}
                releaseKeyboardKey={this.props.releaseKeyboardKey}/>
    );
  }
}

export default Instrument;

