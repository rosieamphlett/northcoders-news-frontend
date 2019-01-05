import React, { Component } from 'react';
import pt from 'prop-types';
import {history} from '../index'

class Nav extends Component {
    onChange = (e) => {
        history.push(`${e.target.value}`)  
    }

    render() {
        return (
            <div>
                <nav className="navbar">
                <select className="topics" onChange={this.onChange}>
                    <option value="/">Home</option>
                    {this.props.topics.map((topic, i) => (
                  <option value={`/topics/${topic.slug}`} key={i}>{topic.title}</option>))}
                </select>
                </nav>
            </div>
        );
    }
}

Nav.propTypes = {
    topics: pt.array.isRequired,
}


export default Nav;