import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import * as api from '../api'
const activeStyle = { color: "rgb(236, 109, 130)" };

class Nav extends Component {
    state ={
        topics: []
    }
    
    render() {
        return (
            <div>
                <nav className="navbar">
                {this.state.topics.map((topic, i) => (
                <NavLink to={`/topics/${topic.slug}`} activeStyle={activeStyle} key={i}>{" | " } {topic.title} {" | "}</NavLink>))}
                </nav>
            </div>
        );
    }

    componentDidMount() {
        api.fetchTopics()
          .then(topicsData => {
          this.setState({
            topics: topicsData.data.topics,
          })
        })
    }
}

export default Nav;