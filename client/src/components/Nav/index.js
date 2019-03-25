import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="selected"><Link to="/"><i className="fa fa-tasks"></i>Jobs</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;