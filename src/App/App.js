import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import Header from '../Header/Header';
import List from '../List/List';
import Post from '../Post/Post';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Header title="Sample blog" />
          <Link to='/dashboard' className="btn btn-dashboard"><span>Dashboard</span></Link>
          <Route exact path="/" component={List} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Footer text={`Copyright @ ${new Date().getFullYear()}`} />
        </div>
      </Router>
    );
  }
}

export default App;
