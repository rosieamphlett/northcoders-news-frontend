import React, { Component } from 'react';
import * as api from "../api";

class AddArticle extends Component {
    state = {
        title: '',
        body: '',
        topic: ''
    }

    render() {
        return (
            <div className="postArticle">
                <form className="articleform" onSubmit={this.submit}>
                <h1>Post a New Article</h1>
                    <input type='text' placeholder='Title' name="title" onChange={this.changeInput}
                        value={this.state.title} className='titleBox' /><br/>
                    <input type='text' placeholder="What would you like to write about?"
                        onChange={this.changeInput} name="body" value={this.state.body} className='bodyBox'/><br/>
                    <select className="select" onChange={this.changeTopic}>
                        <option>Pick a Topic</option>
                            {this.props.topics.map(topic => (
                                <option className="select-options" value={topic.name} name={topic} key={topic._id}>
                            {topic.title}
                        </option>)) }
                    </select><br/><br />
                    <button>Post Article</button>
                </form>
            </div>
        );
    }

    changeInput = (event) => {
        let { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    changeTopic = (event) => {
        this.setState({
            topic: event.target.value
        },
        () => this.props.topics.forEach(topic => {
            if(topic._id === this.state.topic._id) {
                this.setState({
                    topic: topic.slug
                })
            }
        }))
    }

    submit = (event) => {
        event.preventDefault();
        const content = {
            title: this.state.title,
            body: this.state.body,
            belongs_to: this.state.topic,
            created_by: this.props.user
        }

        api.postNewArticle(this.state.topic, content)
            .then(() => {
                this.props.addContent(content) 
                this.setState({
                    title: '',
                    topic: '',
                    body: ''
                })
            })
    }
}

export default AddArticle;