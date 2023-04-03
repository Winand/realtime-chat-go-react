import React, { Component } from "react";
import './App.css';
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      chatHistory: []
    }
  }

  componentDidMount() {
    connect((msg) => {
      var json_msg = JSON.parse(msg.data)
      if (json_msg.setID) {
        console.log("Client ID:", json_msg.setID)
        this.setState(prevState => ({
          ID: json_msg.setID
        }));
        return
      }

      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    });
  }

  send(event) {
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ChatHistory clientID={this.state.ID} chatHistory={this.state.chatHistory}/>
        <ChatInput send={this.send}/>
      </div>
    );
  }
}

export default App;
