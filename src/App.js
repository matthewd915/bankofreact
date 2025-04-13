/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
Expand
message.js
4 KB
﻿
```js
/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      credit: [],
      debit: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  componentDidMount() {

    //request, goes untill both work or one breaks, goes into creditRes and debitRes
    Promise.all([
      fetch("https://johnnylaicode.github.io/api/credits.json"),
      fetch("https://johnnylaicode.github.io/api/debits.json")
    ])

    //checks if the responses are OK (are in and okay status range) and then converts to json
    .then(([creditRes, debitRes]) => {

      if(!creditRes.ok || !debitRes.ok ) {
        throw new Error ("FAILED TO FETCH DATA");
      }

      //need to return both as jsons ( if we dont return we cant access this outside)
      return Promise.all([creditRes.json(), debitRes.json()]);

    })

    //json data goes into creditData and debitData, we update the states to hold the response
    .then(([creditData, debitData]) => {

      this.setState({
        credit: creditData,
        debit: debitData
      });
    })

    //catches error 
    .catch(error => {

      console.error("Error fetching credit or debit data:", error);

    });

  }

  addCredit = (added_credit) => {
    const new_credit_list = [...this.state.credit, added_credit] // create a new array appending added_credit obj to the end
    // set creditList to new_credit_list and add the credit amt to our balance
    this.setState(prevState => ({
      credit: new_credit_list,
      accountBalance: prevState.accountBalance + added_credit.amount,
    }));
  }

  addDebit = (added_debit) => {
    const new_debit_list = [...this.state.debit, added_debit] // create a new array appending added_debit obj to the end
    // set debit to new_debit_list and add the add amt to our balance
    this.setState(prevState => ({
      debit: new_debit_list,
      accountBalance: prevState.accountBalance - added_debit.amount
    }));
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.credit} addCredit={this.addCredit}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debit} addDebit={this.addDebit}/>) 
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bankofreact">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;