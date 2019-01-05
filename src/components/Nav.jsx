import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
const activeStyle = { color: "rgb(236, 109, 130)" };

class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar">
                  {this.props.topics.map((topic, i) => (
                  <NavLink to={`/topics/${topic.slug}`} activeStyle={activeStyle} key={i}>{" | " } {topic.title} {" | "}</NavLink>))}
                </nav>
            </div>
        );
    }
}



export default Nav;