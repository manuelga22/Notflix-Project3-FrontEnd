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

async shouldComponentUpdate(){
  
  const movies = this.props.match.params.movies;

  await this.fetchMovies(movies)
  console.log(this.state.movieResults)
  
  return true;
}

fetchMovies = (movies) => {
  Axios.get(`${process.env.REACT_APP_BASEURL}/api/movieApi/search/${movies}`)
  .then((response)=>{
    this.setState({
      movieResults: response.data.movie
    })
    
  }).catch(err=>{

    console.log(err)
  })
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