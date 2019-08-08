import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import "./home.css";



class Favorites extends Component {
  state = {
    loading:false,
  
    }


  showMoviesInFavorites = () => { 
  
      console.log(this.props.moviesInFavorites);
      return this.props.moviesInFavorites.map((movies, i) => {
        return (
          <Fragment>
          <Link className="linksOfFavorites" key={i} to={`/movieInfo/${movies.data.movie.imdb_id}`}>
            <img
              className="imageSize hoverable z-depth-5 "
              src={movies.data.movie.images.banner}
              alt=""
            />
          </Link>
          <button className="btn" onClick={() => {
            const movieID = this.props.idsOfMovieObjects[i];
            const userID=this.props.user._id;
            return this.props.deleteFromList(movieID,userID)
          }}>Delete from list</button>
          </Fragment>
        );
      });
  };
   
 
  render() {
 
    return (
      <div className="movieCart">
      {this.props.moviesInFavorites.length>=1? 
        this.showMoviesInFavorites()
      :
      <p>Nothing In Favorites</p>
      }
      </div>
    )
 
    
  } 
}

export default Favorites;


  // console.log("user in profile", this.props.user);
    // if(this.props.user) {
    //   this.setState({doneLoading: true})
    // } else {

    //   this.getTheIdsOfMoviesInFavorites()
    // }