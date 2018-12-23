import { apiUrl, postsLimit } from '../config';

export function getPostFromApi(id) {
    fetch(`${apiUrl}posts/${id}`)
        .then(response => response.json())
        .then(post => this.setState(state => (
            { ...state, id: post.id, title: post.title, body: post.body, isLoading: false })))
        .catch(error => console.error(error));
}

export function getPostsFromApi() {
    fetch(`${apiUrl}posts`)
        .then(response => response.json())
        .then(json => json.slice(0, postsLimit))
        .then(posts => this.setState(state => ({ ...state, posts })))
        .catch(error => console.error(error));
}