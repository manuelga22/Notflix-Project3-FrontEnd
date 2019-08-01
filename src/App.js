import React from "react";
//import logo from './logo.svg';
import "./App.css";
import NavBar from "./components/navBar";
import Dashboard from "./components/home";
import SignUp from "./components/sign-up";
import LogIn from "./components/logIn";
import MovieInfo from "./components/movieInfo"
import { Route, Switch } from "react-router-dom";
import axios from "axios";
function App() {
  let moviesInSearch = [];

  function searchBar(e) {
    e.preventDefault();
    axios
      .get(`https://tv-v2.api-fetch.website/movies/1`, {
        params: {
          keywords: e.target.value
        }
      })
      .then(movies => {
        console.log("the movies", movies);
        moviesInSearch = [movies];
        console.log("movies in search", moviesInSearch);
      })
      .catch(err => console.log(err));
  }

  function getCurrentlyLoggedInUser(){
    this.service.currentUser()
    .then((theUser)=>{
      this.setState({currentlyLoggedIn: theUser})
    })
    .catch(()=>{
      this.setState({currentlyLoggedIn: null})
    })
  }
  componentDidMount(){
    this.getCurrentlyLoggedInUser();
  }
  return (
    <div className="App">
      <NavBar search={searchBar} />
      <Switch>
        <Route exact path="/"> <Dashboard /> </Route>
        <Route exact path="/movieInfo/:id" component={MovieInfo}></Route>
        <Route exact path="/signUp" getUser={getCurrentlyLoggedInUser} component={SignUp}></Route>
        <Route exact path="/logIn" getUser={getCurrentlyLoggedInUser} component={LogIn}></Route>
      </Switch>
    </div>
  );
}

export default App;
