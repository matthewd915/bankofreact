import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './Home.css';
import bank_image from '../img/bank.png'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-header">Welcome to The Bank of React</div>

        <img
          className="home-image"
          src={bank_image}
          alt="bank"
        />

        <div className="home-links">
          <Link to="/userProfile">User Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/credits">Credits</Link>
          <Link to="/debits">Debits</Link>
        </div>

        <div className>
          <AccountBalance accountBalance={this.props.accountBalance} />
        </div>
      </div>
    );
  }
}

export default Home;
