import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import * as api from '../api'
import AddArticle from './AddArticle';
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
                </nav>{this.props.loggedInUser && <AddArticle topics={this.state.topics} user={this.props.user} addContent={this.props.addContent}/>}
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