import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import NavBar from "./components/navBar";
import Dashboard from "./components/home";
import SignUp from "./components/sign-up";
import LogIn from "./components/logIn";
import MovieInfo from "./components/movieInfo";
import { Route, Switch } from "react-router-dom";
import Axios from "axios";
class App extends Component {
  moviesInSearch = [];
  state = {
    currentlyLoggedIn: null
  };

  //  searchBar=(e)=> {
  //   e.preventDefault();
  //   Axios
  //     .get(`https://tv-v2.api-fetch.website/movies/1`, {
  //       params: {
  //         keywords: e.target.value
  //       }
  //     })
  //     .then(movies => {
  //       console.log("the movies", movies);
  //       this.moviesInSearch = [movies];
  //       console.log("movies in search", this.moviesInSearch);
  //     })
  //     .catch(err => console.log(err));
  // }

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

  logout = () => {
    Axios.post(
      "http://localhost:5000/logout",
      {},
      { withCredentials: true }
    )
      .then(response => {
        console.log(response);
        this.getCurrentlyLoggedInUser();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <NavBar logout={this.logout} search={this.searchBar} user={this.state.currentlyLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          <Route exact path="/movieInfo/:id" component={MovieInfo} />
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
            render={props => <LogIn {...props} getUser={this.getCurrentlyLoggedInUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
