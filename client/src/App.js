import React, { Component } from 'react';
import ApiService from './services/ApiService';
import Nav from './components/Nav';
import Account from './components/Account';
import Jobs from './areas/Jobs';

class App extends Component {
  constructor(props){
    super(props);
    this.apiService = new ApiService(process.env.REACT_APP_API_BASE_URI);
  }
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
          <Jobs apiService={this.apiService}/>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
