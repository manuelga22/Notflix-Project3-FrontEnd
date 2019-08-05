import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import NavBar from "./components/navBar";
import Dashboard from "./components/home";
import SignUp from "./components/sign-up";
import LogIn from "./components/logIn";
import Profile from "./components/profile";
import MovieInfo from "./components/movieInfo";
import showResults from "./components/showResults";
import { Route, Switch } from "react-router-dom";
import Axios from "axios";
import StreamMovie from "./components/streamMovie";

class App extends Component {
  moviesInSearch = [];
  state = {
    currentlyLoggedIn: null,
    test: false,
    movieLink: ""
  };
  getCurrentlyLoggedInUser = () => {
    Axios.get("http://localhost:5000/getcurrentuser", { withCredentials: true })
      .then(response => {
        console.log("yay really fetching the user now");
        let theUser = response.data;
        this.setState({ currentlyLoggedIn: theUser });
        return theUser;
      })
      .catch(() => {
        this.setState({ currentlyLoggedIn: null });
      });
  };

  componentDidMount() {
    this.getCurrentlyLoggedInUser();
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <NavBar
              {...props}
              logout={this.logout}
              search={this.searchBar}
              getUser={this.getCurrentlyLoggedInUser}
              user={this.state.currentlyLoggedIn}
              searchBar={e => this.searchBar(e)}
            />
          )}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Dashboard {...props} moviesToShow={this.state.moviesToShow} />
            )}
          />
          <Route
            exact
            path="/movieInfo/:id"
            render={props => (
              <MovieInfo
                {...props}
                user={this.state.currentlyLoggedIn}
                getUser={this.getCurrentlyLoggedInUser}
                link={this.state.movieLink}
              />
            )}
          />

          <Route exact path="/showResults/:movies" component={showResults} />

          <Route
            exact
            path="/signUp"
            render={props => (
              <SignUp {...props} getUser={this.getCurrentlyLoggedInUser} />
            )}
          />

          <Route
            exact
            path="/logIn"
            render={props => (
              <LogIn {...props} getUser={this.getCurrentlyLoggedInUser} />
            )}
          />

          <Route
            exact
            path="/profile"
            render={props => (
              <Profile
                {...props}
                getUser={this.getCurrentlyLoggedInUser}
                user={this.state.currentlyLoggedIn}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
