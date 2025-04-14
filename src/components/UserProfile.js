import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

class UserProfile extends Component {
  render() {
    return (
      <div className="user-container">
        <div className>
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
        </div>

        <Link to="/" className="user-button">
          Return to Home
        </Link>
      </div>
    );
  }
}

export default UserProfile;
