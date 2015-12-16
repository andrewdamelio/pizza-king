import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import socket from '../socket/socket';


class Chat extends Component {

  static propTypes = {
    chat: PropTypes.object.isRequired,
  }

  _updateChatLog = (e) => {
    if (e.keyCode === 13) {
      const message = this.refs.msg.value;
      socket.emit('chatMsg', message);
      this.refs.msg.value = null;
      this.refs.msg.blur();
    }
  }

  componentDidUpdate() {
    const node = this.refs.log;
    node.scrollTop = 9999999;
  }

  render() {
    const { props } = this;
    const showChat = props.chat.map((value, idx) => {
      return (
        <div key={ idx }>
          <strong>{ value.get('name') }:</strong> { value.get('msg') }
        </div>
      );
    });

    return (
      <div style={ styles.base }>
        <div  ref="log"
              className=""
              style={styles.log}>
          { showChat }
        </div>

        <input className="mt1"
               style={ styles.input }
               type="text"
               ref="msg"
               onKeyDown={ this._updateChatLog } />
      </div>
    );
  }
}


const styles = {
  base: {
    width: '600px',
  },
  log: {
    height: 125,
    fontSize: '0.7em',
    overflow: 'scroll',
  },
  input: {
    height: 10,
    fontSize: '0.7em',
  },
};

export default Radium(Chat);


