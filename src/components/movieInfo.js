import React, {Component}  from 'react';
import Axios from 'axios';
import WebTorrent from "webtorrent";
//import axios from 'axios';

class movieInfo extends Component{
state = {
  img: "",
  synopsis:"",
  title:"",
  torrentID: "",
  loading:true
}
 componentDidMount(){
    Axios.get(`http://localhost:5000/movieInfo/${this.props.match.params.id}`)
    .then((movies)=>{
      let Info = movies.data.movieInfo;
      console.log(Info)
      this.setState({
        img:Info.images.banner,
        title:Info.title,
        synopsis: Info.synopsis,
        torrentID:Info.torrents.en['1080p'].url,
        loading:false
      })
    })
  }
  getInfoOfMovie =()=>{
    return(
      <div>
       <h1>{this.state.title}</h1>
       <img src={this.state.img} alt=""></img>
       <p>{this.state.synopsis}</p>
       <video controls>
          <source src={this.state.video}></source>
       </video>
       </div>
    );
  }
render(){
  return(
   <div>
    {this.state.loading ?
    <p>Loading...</p>
    : 
    this.getInfoOfMovie()}
   </div>
  );
}
}
export default movieInfo;