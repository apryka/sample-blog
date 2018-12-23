import React, { Component } from 'react';
import { getPostFromApi } from '../utils';

import "./Post.css";

class Post extends Component {

    constructor() {
        super();
        this.getPostFromApi = getPostFromApi.bind(this);

        this.state = {
            id: null,
            title: '',
            body: '',
            isLoading: true
        };
    }
    
    componentDidMount() {
        this.getPostFromApi(this.props.match.params.id);
    }

    render() {
        const isLoadingData = this.state.isLoading;
        return isLoadingData ?
            <div className="loader">Loading...</div> :
            <>
                <h1 className="post-title">{this.state.title}</h1>
                <p className="post-body">{this.state.body}</p>
            </>
    }
}

export default Post;
