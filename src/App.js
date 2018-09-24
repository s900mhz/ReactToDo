import React, { Component } from "react";
import "./App.css";
import ToDoList from "./ToDoList";

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <ToDoList />
      </React.StrictMode>
    );
  }
}

export default App;
