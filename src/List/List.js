import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPostsFromApi } from '../utils';

import './List.css';

class List extends Component {

    constructor() {
        super();
        this.getPostsFromApi = getPostsFromApi.bind(this);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        this.getPostsFromApi();
    }

    render() {
        const shouldRenderList = !!this.state.posts.length;
        return shouldRenderList ?
            <ul className="list">
                {this.state.posts.map(post => (
                <React.Fragment key={post.id}>
                    <li className="list-item">
                        <small className="list-item-index">{`post no.${post.id}`}</small>
                        <Link to={`/post/${post.id}`} className="list-item-title">{post.title}</Link>
                    </li>
                </React.Fragment>
                ))}
            </ul> :
            <div className="loader">Loading ...</div>;
    }
}

export default List;
