import React, { Component } from 'react';

class Account extends Component {
  render() {
    const cookies = window.document.cookie.split(';')
      .filter(x => x)
      .map((x) => {
        const idx = x.indexOf('=');
        return {
          name: x.substr(0, idx),
          value: x.substr(idx + 1),
        };
      });
    const token = cookies.find(c => c.name === 'identity_details');
    const id = JSON.parse(Buffer.from(token.value, 'base64').toString('utf8'));
    
    return (
      <div className="logged-in-profile">
        <div className="account-name">{id.given_name} {id.family_name}</div>
        <div><a href="#">Sign out</a></div>
      </div>
    );
  }
}

export default Account;