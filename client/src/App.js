import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApiService from './services/ApiService';
import Nav from './components/Nav';
import Account from './components/Account';
import Jobs from './areas/Jobs';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiService = new ApiService(process.env.REACT_APP_API_BASE_URI);
    this.state = {
      authRequired: false,
    };
  }

  authenticate() {
    this.setState({
      authRequired: true,
    });
  }

  routes() {
    return (
      <React.Fragment>
        <Route path="/" render={() => <Jobs apiService={this.apiService} authenticate={this.authenticate.bind(this)}/>}/>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.authRequired) {
      window.location.href = `${process.env.REACT_APP_API_BASE_URI}/auth`;
      return null;
    }
    return (
      <Router>
        <div className="header-container">
          <header>
            <h1>DSI Monitor</h1>
            <Account/>
          </header>
          <Nav/>
        </div>
        <main>
          {this.routes()}
        </main>
      </Router>
    );
  }
}

export default App;
