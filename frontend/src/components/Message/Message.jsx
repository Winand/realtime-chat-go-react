import React, { Component } from "react";
import "./Message.scss";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: JSON.parse(props.message)
        };
    }

    render() {
        return <div className="Message">{this.state.message.body}</div>;
    }
}

export default Message;
