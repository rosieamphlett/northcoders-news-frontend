import React, { Component } from 'react';
import { Link } from "react-router-dom";
// const activeStyle = { color: "rgb(236, 109, 130)" };


class Nav extends Component {
  render () {
    return (
        <nav>
          <Link className="topicLink" to="/topics/football">Football</Link>
          <Link className="topicLink" to="/topics/cooking">Cooking</Link>
          <Link className="topicLink" to="/topics/coding">Coding</Link> 
        </nav>
    );
  }
}

export default Nav;