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
import Footer from "./components/footer"
import { Route, Switch } from "react-router-dom";
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
      .get("http://localhost:5000/getcurrentuser", { withCredentials: true })
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
    if(this.state.user){
    this.fecthInfoOfFavorites();
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextState.moviesToShowInFavorites.length !== this.state.moviesToShowInFavorites.length){
  //    return true;
  //   }
  //  return false
  // }

  //list of favorites stuff
  fecthInfoOfFavorites = () => {
    setTimeout(() => {
      this.getTheIdObjectsOfMoviesInFavorites();
    },100)
    setTimeout(() => {
      this.getIdsOfMoviesInFavorites();
    }, 200);
    setTimeout(() => {
      this.getActualMoviesWithTheInfo();
    }, 300);
  };

  getTheIdObjectsOfMoviesInFavorites = () => {
    console.log(this.state.currentlyLoggedIn);
    this.setState({
      idObjectsMoviesInFavorites: this.state.currentlyLoggedIn.favorites
    });
    console.log("ids of movies", this.state.idObjectsMoviesInFavorites);
  };

  getIdsOfMoviesInFavorites = () => {
    let arr = [];
    this.state.idObjectsMoviesInFavorites.forEach(moviesId => {
      axios
        .get(`http://localhost:5000/getIdOfmovie/${moviesId}`)
        .then(movie => {
          arr.push(movie.data);
          this.setState({
            imdbIdsOfMovie: arr
          });
        })
        .catch(err => console.log(err));
    });
    console.log("imdbIdsOfMovie", this.state.imdbIdsOfMovie);
  };

  getActualMoviesWithTheInfo = () => {
    let arr = [];
    this.state.imdbIdsOfMovie.forEach(imdbId => {
      axios
        .get(`http://localhost:5000/getInfoOfmovie/${imdbId}`)
        .then(movieInfo => {
          arr.push(movieInfo);
          this.setState({
            moviesToShowInFavorites: arr
          });
        });
    });
  };

  deleteFromList = (movieID, userID) => {
    console.log("deleting in app.js");
    axios
      .post(`http://localhost:5000/deleteFromFavorites/${userID}/${movieID}`)
      .then(res => {
        console.log(res);
      });
      
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

          <Route
            exact
            path="/favorites"
            render={props => (
              <Favorites
                {...props}
                user={this.state.currentlyLoggedIn}
                getUser={this.getCurrentlyLoggedInUser}
                getFavorites={this.getTheIdObjectsOfMoviesInFavorites}
                getMoviesInFavorites={this.getIdsOfMoviesInFavorites}
                getInfoOfMoviesInFavorites={this.getActualMoviesWithTheInfo}
                deleteFromList={this.deleteFromList}
                idsOfMovieObjects={this.state.idObjectsMoviesInFavorites}
                moviesInFavorites={this.state.moviesToShowInFavorites}
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
