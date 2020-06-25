import React, { Component } from 'react';
import '../css fils/Network.css'
import socket from 'socket.io-client';

class Network extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      my_id: null,
      my_name: null,
      recipient_id: null,
      recipient_name: null,
      messages_from_users: {},
      user: JSON.parse(sessionStorage.getItem("user")),
    }
    // console.log(sessionStorage);
    this.user_regiser = this.state.user.fullName;
    this.user_name = this.user_regiser;
    this.message = "";
    this.socketC = socket.connect('http://localhost:5000');
    this.socketC.emit("user_connect", this.user_name);
    this.socketC.on("getUsers", (users_list) => {
      this.setState({ users: users_list });
      // console.log('e', users_list);
    });
    this.socketC.on("my_id", (data) => {
      this.setState({
        my_id: data.my_socket_id,
        my_name: data.user_name
      });
    });
    this.socketC.on("new_message", (data) => {
      let message_list = this.state.messages_from_users[data.sender_id];
      if (message_list !== undefined) {
        message_list.push(data.message);
      }
      else {
        message_list = [];
        message_list.push(data.message);
      }
      const new_conversation = { ...this.state.messages_from_users };
      new_conversation[data.sender_id] = message_list;
      this.setState({ messages_from_users: new_conversation });
      // console.log(this.state.messages_from_users)
    });
  }
  render() {
    let msg_content = null;
    let message_elements = this.state.messages_from_users[this.state.recipient_id];
    if (message_elements !== undefined) {
      msg_content = message_elements.map((msg, index) => {
        // console.log(msg);
        return (
          <div>
            <span id="msg_user_name">{this.user_name}</span><span id="msg_from_user">: {msg}</span>
          </div>
        )
      });
    }
    else {
      msg_content = "";
    }
    let element_users = this.state.users.map((user, index) => {
      return (
        <ul key={index}>
          <li onClick={() => this.setState({
            recipient_id: user.id,
            recipient_name: user.name,
          })}>{user.name}</li>
        </ul>
      )
    });
    return (
      <div className="mainContainer">
        <h1>LET'S NETWORK</h1>
        <div className="Network">
          <h1 id="sendTittle"> Private Chat </h1>
          <div id="users_container">
            {element_users}
          </div>
          <div id="conteinerNetwork">
            <input id="message" type="text" placeholder="write your message..." onChange={(event) => { this.message = event.target.value }} />
            <button onClick={this.send_message} >Send</button>
          </div>
          <div id="msg_content">{msg_content}</div>
        </div>
      </div>
    );
  }
  send_message = () => {
    this.socketC.emit("message", { send_message: this.message, recive_message: this.state.recipient_id });
  }
  componentDidMount() {
    this.socketC.emit("my_id", this.user_name);
  }
}

export default Network;


