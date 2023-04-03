import React, { Component } from "react";
import "./Message.scss";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: props.clientID,
            message: JSON.parse(props.message)
        };
    }

    render() {
        if(this.state.message.client_id === this.state.clientID)
            return <div className="Message me">{this.state.message.body}</div>;
        else return <div className="Message">{this.state.message.body}</div>;
    }
}

export default Message;
