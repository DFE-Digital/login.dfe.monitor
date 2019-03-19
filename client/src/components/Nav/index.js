import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="selected"><a href="#"><i className="fa fa-tasks"></i>Jobs</a></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;