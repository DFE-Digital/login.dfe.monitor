import React, { Component } from 'react';

class Account extends Component {
  render() {
    return (
      <div className="logged-in-profile">
        <div className="account-name">Some User</div>
        <div><a href="#">Sign out</a></div>
      </div>
    );
  }
}

export default Account;