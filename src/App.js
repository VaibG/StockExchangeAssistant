import React from 'react';
import './App.css';
import NavBar from './Components/NavBar.js'
import Main from './Main.js'

class App extends React.Component {
  render() {
  return (
    <div className="App">
    	<NavBar />
    	<Main />
    </div>
  );
  }
}

export default App;
