import React, {Component, Fragment}  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './home.css'


class Home extends Component{
state = {
  movies: [],
  newMovies:[],
  loading: true
}

componentDidMount() {
this.fetchPopularMovies();
this.fetchNewestMovies();
}
fetchPopularMovies=()=>{
  axios.get(`${process.env.REACT_APP_BASEURL}/route/getMovies`)
  .then((themovies)=>{
    this.setState({
      movies: themovies.data.movies,
      loading: false
    })
  }).catch((err)=>console.log(err))
}
fetchNewestMovies=()=>{
  axios.get(`${process.env.REACT_APP_BASEURL}/route/newMovies`)
  .then((themovies)=>{
    this.setState({
      newMovies: themovies.data.movies,
      loading: false
    })
  }).catch((err)=>console.log(err))

}

getPopularMovies=()=>{
  
    return this.state.movies.map((movies,i)=>{
    //console.log(this.state.movies)
    return(    
     <Link className="links " key={i} to={`/movieInfo/${movies.imdb_id}`}><img className="imageSizeHome force-overflow zoom hoverable z-depth-5 " src={movies.images.banner}  alt=""/></Link>
  
    );
   })
}
getNewestMovies=()=>{
  return this.state.newMovies.map((movies,i)=>{
    return(
      <Link className="links " key={i} to={`/movieInfo/${movies.imdb_id}`}><img className="imageSizeHome force-overflow zoom hoverable z-depth-5 " src={movies.images.banner}  alt=""/></Link>
    );
  })

}

render(){

  return(
    <Fragment >
    <div className = "movieCartHome scrollbar" id="style-3">
    <h3 className="titleCategory"><b>Popular Movies</b></h3>
    {
      this.state.loading ?
      <div className="progress white">
      <div className="indeterminate red"></div>
      </div>
      :
 
      <Fragment>
      {this.getPopularMovies()}
      </Fragment>
    }
   </div>
   <div className = "movieCartHome scrollbar" id="style-3">
   <h3 className="titleCategory"><b>Newest Movies</b></h3>
    {
      this.state.loading ?
      <div className="progress white">
      <div className="indeterminate red"></div>
      </div>
      :
 
      <Fragment>
      {this.getNewestMovies()}
      </Fragment>
    }
   </div>

   </Fragment>
  );
 }

}
export default Home;