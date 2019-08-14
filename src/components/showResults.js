import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Axios from 'axios';

class showResults extends Component{
  state = {
    movieResults: []
  }

componentDidMount() {
  const movies = this.props.match.params.movies;
  this.fetchMovies(movies)
}

fetchMovies = (movies) => {
  Axios.get(`${process.env.REACT_APP_BASEURL}/route/search/${movies}`)
  .then((response)=>{
    this.setState({
      movieResults: response.data.movie
    })
  }).catch(err=>{

    console.log(err)
  })
}

shouldComponentUpdate(nextProps) {
  console.log(this.props.match.params.movies, nextProps.match.params.movies)
  // if(this.props.match.params.movies !== nextProps.match.params.movies) {
  //   this.fetchMovies(this.props.match.params.movies)
  //   return true
  // }

  // return false
  return true
}

showMovies=()=>{
  return this.state.movieResults.map((movies,i)=>{
    //console.log(this.state.movies)
    return(    
     <Link className="links" key={i} to={`/movieInfo/${movies.imdb_id}`}><img className="imageSize zoom" src={movies.images.banner}  alt=""/></Link> 
    );
  })
} 

render(){
  return(
    <div className="movieCart">

    {this.state.movieResults.length>=1? 
    this.showMovies()
    :       
      <div className="progress white">
      <div className="indeterminate red"></div>
      </div> }
      
  </div>
  );
}




}

export default showResults;