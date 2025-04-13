import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-header">Welcome to The Bank of React</div>

        <img
          className="home-image"
          src="https://picsum.photos/200/200"
          alt="bank"
        />

        <div className="home-links">
          <Link to="/userProfile">User Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/credits">Credits</Link>
          <Link to="/debits">Debits</Link>
        </div>

        <div className="balance-display">
          <AccountBalance accountBalance={this.props.accountBalance} />
        </div>
      </div>
    );
  }
}

export default Home;
