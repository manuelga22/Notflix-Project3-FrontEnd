import React, {Component}  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './home.css'


class Home extends Component{
state = {
  movies: [],
  loading: true
}

componentDidMount() {
  axios.get('http://localhost:5000/getMovies')
    .then((themovies)=>{
      this.setState({
        movies: themovies.data.movies,
        loading: false
      })
    }).catch((err)=>console.log(err))
}

getMovies=()=>{

  return this.state.movies.map((movies,i)=>{
    //console.log(this.state.movies)
    return(
    
     <Link className="links"  to={`/movieInfo/${movies.imdb_id}`}><img className="imageSize" src={movies.images.banner} key={i} alt=""/></Link>
  
    );
  })

}

render(){
  // console.log(this.props.displayMovies);
  // console.log(this.props);
  return(
  <div className = "movieCart">
   
    {
      this.state.loading ?
      <p>Loading...</p>
      :
      this.getMovies()
    }
   
   </div>
  );
 }
}
export default Home;