import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import NavBar from "./components/navBar";
import Dashboard from "./components/home";
import SignUp from "./components/sign-up";
import LogIn from "./components/logIn";
import Profile from "./components/profile";
import Favorites from "./components/favorites";
import MovieInfo from "./components/movieInfo";
import showResults from "./components/showResults";
import SeeReviews from "./components/seeReviews";
import Footer from "./components/footer"
import { BrowserRouter,Route, Switch } from "react-router-dom";
import axios from "axios";
//import StreamMovie from "./components/streamMovie";

class App extends Component {
  moviesInSearch = [];
  state = {
    currentlyLoggedIn: null,
    test: false,
    movieLink: [],

    idObjectsMoviesInFavorites: [],
    imdbIdsOfMovie: [],
    moviesToShowInFavorites: []
  };

  getCurrentlyLoggedInUser = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/auth/getcurrentuser`, { withCredentials: true })
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


  //list of favorites stuff
  deleteFromList = (movieID, userID) => {
    console.log("deleting in app.js");
    return axios.post(`${process.env.REACT_APP_BASEURL}/api/user/deleteFromFavorites/${userID}/${movieID}`, {})   
  };

  emptyTheStateOfFavorites = () => {
    this.setState({
      idObjectsMoviesInFavorites: [],
      imdbIdsOfMovie: [],
      moviesToShowInFavorites: []
    });
  };
  //

  render() {
    return (
      
      <div className="App">
        <div className="content"> 
        <Route
          path="/"
          render={props => (
            <NavBar
              {...props}
              logout={this.logout}
              search={this.searchBar}
              getUser={this.getCurrentlyLoggedInUser}
              emptyTheState={this.emptyTheStateOfFavorites}
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
                idsOfMovieObjects={this.state.idObjectsMoviesInFavorites}
                deleteFromList={this.deleteFromList}
              />
            )}
          />

          <Route exact path="/showResults/:movies" component={showResults} />

          <Route exact path="/movieReview/:movieId" render={props=>(
            <SeeReviews
            {...props}
            user={this.state.currentlyLoggedIn}
             />
            )}
            />

            
          <Route
            exact
            path="/favorites"
            render={props => (
              <Favorites
                {...props}
                user={this.state.currentlyLoggedIn}
                getUser={this.getCurrentlyLoggedInUser}
      
                userFavorites = {this.state.idObjectsMoviesInFavorites}
                deleteFromList={this.deleteFromList}
               
                getActualMoviesWithTheInfo={this.getActualMoviesWithTheInfo}    
              />
            )}
          />

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
        <Footer/>
    
      </div>
    );
  }
}

export default App;

// let arr = [];
// axios
//   .get(
//     `http://localhost:5000/moviesInFavorites/${
//       this.state.currentlyLoggedIn._id
//     }`
//   )
//   .then(movies => {
//     arr.push(movies.data.favorites);
//     this.setState({
//       idObjectsMoviesInFavorites: arr
//     });
