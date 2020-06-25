import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Chat from './components/Chat';
import Network from './components/Network';
import AddMeetup from './components/AddMeetup';
import ShowAllMeetups from './components/ShowAllMeetups';
import News from './components/news';
import Footer from './components/Footer';

class App extends Component {
  state = { user: JSON.parse(sessionStorage.getItem('user')) };
  setUser = user => {
    this.setState({ user: user });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <Link to='/'>Home</Link>
            {!this.state.user ? <Link to='/Login'>Login</Link> : ""}
            {!this.state.user ? <Link to='/Register'>Register</Link> : ""}
            {this.state.user ? <Link to='/Chat'>Chat</Link> : ""}
            {this.state.user ? <Link to='/Network'>Network</Link> : ""}
            {this.state.user ? <Link to='/AddMeetup'>Add Meetup</Link> : ""}
            {this.state.user ? <Link to='/ShowAllMeetups'>Show All Meetups</Link> : ""}
            {this.state.user ? <Link to='/news'>news</Link> : ""}
            {this.state.user ? <Link to='/Logout'>Logout</Link> : ""}
          </nav>
          <content>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Login' render={() => <Login setUser={this.setUser} />} />
              <Route exact path='/Register' render={() => <Register setUser={this.setUser} />} />
              <Route render={() => {
                if (!this.state.user) {
                  return <Redirect to="/Logout" />
                }
                return (

                  <Switch>

                    <Route exact path='/Chat' component={Chat} />
                    <Route exact path='/Network' component={Network} />
                    <Route exact path='/AddMeetup' component={AddMeetup} />
                    <Route exact path='/ShowAllMeetups' component={ShowAllMeetups} />
                    <Route exact path='/news' component={News} />
                    <Route exact path='/Logout' render={() => <Logout setUser={this.setUser} />} />

                  </Switch>

                );
              }} />
            </Switch>
          </content>
          <Footer />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
