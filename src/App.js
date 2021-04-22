
import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';


class App extends Component {
  

  render() {
    return (
      <div className="App">
        <AppBar position="static" >
          <Toolbar>Kuittausjärjestelmä</ Toolbar>
        </ AppBar>
        <div style={{position: 'static'}}>
        <Login /> 
        </div>
      </div>
      
    );
  }
}

export default App;
