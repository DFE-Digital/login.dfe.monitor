import React, { Component } from 'react';
import Nav from './components/Nav';
import Account from './components/Account';
import Jobs from './areas/Jobs';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="header-container">
          <header>
            <h1>DSI Monitor</h1>
            <Account/>
          </header>
          <Nav/>
        </div>
        <main>
          <Jobs/>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
