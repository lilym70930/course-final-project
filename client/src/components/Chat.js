import React, { Component } from 'react';
import '../css fils/Chat.css';
import socket from 'socket.io-client';


class Chat extends Component {

    constructor() {
        super();

        this.state = {
            output_messages: [],
            user_typing: ""
        }

        this.message = "";
        this.user_name = "";

        this.socket = socket.connect('http://localhost:5000');

        this.socket.on('chat2', (data) => {

            const messages = [...this.state.output_messages];

            messages.push(data);

            this.setState({
                output_messages: messages,
                user_typing: ""
            })
        });

        this.socket.on('typing', (data) => {

            this.setState({ user_typing: data + ": is typing message..." });
        });
    }
    render() {
        console.log(this.state.output_messages);

        let mesaages_elements = this.state.output_messages.map((message, index) => {

            return (
                <div key={index}>
                    <p><span id="name_span">{message.user_name}</span> : <span>{message.send_message}</span></p>
                </div>
            )
        })

        return (
            <div className="chatContainer">
                <h1>LET'S CHAT</h1>
                <div className="the_chat">


                    <div className="lets_meet_chat">
                        <div id="chat-window">
                            <div id="typing_div">{this.state.user_typing}</div>
                            <div id="output_messages">
                                {mesaages_elements}
                            </div>
                        </div>
                        <input id="handel_name" type="text" placeholder="name" onChange={(event) => { this.user_name = event.target.value }}></input>
                        <input id="write_message" type="text" placeholder="Message" onChange={(event) => this.typing(event)}></input>


                        <button id="send" onClick={this.send_message}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
    send_message = () => {

        this.socket.emit("chat2", { send_message: this.message, user_name: this.user_name });
    }

    typing = (event) => {

        this.message = event.target.value;
        this.socket.emit('typing', this.user_name);
    }
}

export default Chat;