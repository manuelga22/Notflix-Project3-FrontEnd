import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";

class Favorites extends Component {
  state = {
    moviesToShowInFavorites:null
  };
  showMoviesInFavorites = () => {
   this.props.getUser();
    if(this.props.user.favorites.length===0){
         
          this.setState({
            moviesToShowInFavorites:null
          })
          return(
                 <h2>No Movies in Favorites</h2>
          );       
     }

    return this.state.moviesToShowInFavorites.map((movies, i) => {
      return (
          <div className="favoritesList">
            
            <Link
              className="linksOfFavorites imageSize"
              key={i}
              to={`/movieInfo/${movies.imdb_id}`}
            > 
               <img
                className="imageSize hoverable z-depth-5 zoom"
                key={i}
                src={movies.images.banner}
                alt=""
              />
            </Link>
            <button 
              className="btn"
              onClick={()=>{
              // const movieID = this.props.user.favorites[i]._id;
              const movieID = movies._id
              const userID = this.props.user._id;
               this.props.deleteFromList(movieID, userID)
               .then(()=>{
                  this.props.getUser();
                  setTimeout(()=>{ 
               
                    this.getActualMoviesWithTheInfo();
                  },500)  

               })
            }}>
              Delete from list
            </button>

          </div>
   
      );
    });
  };

  componentDidMount(){  
    console.log(this.state)
    setTimeout(()=>{this.getActualMoviesWithTheInfo()},200)
   
  }

  getActualMoviesWithTheInfo = () => {
    let arr = [];
    console.log(this.props.user)
    this.props.user.favorites.forEach(userFavorites => {
      console.log("getting info", userFavorites.movies)
      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/movieApi/getInfoOfmovie/${userFavorites.movies}`)
        .then(movieInfo => {
          console.log(movieInfo)
          let blah = {...movieInfo.data.movie}
          blah._id = userFavorites._id
          arr.push(blah);
          this.setState({
            moviesToShowInFavorites: arr
          });
        });
    });
  };

  render() {
    return (
      <div className="movieCart">
        {this.state.moviesToShowInFavorites? (
          this.showMoviesInFavorites()
        ) : (
          <h2>Nothing In Favorites</h2>
        )}
      </div>
    );
  }
}

export default Favorites;

// console.log("user in profile", this.props.user);
// if(this.props.user) {
//   this.setState({doneLoading: true})
// } else {

//   this.getTheIdsOfMoviesInFavorites()
// }
