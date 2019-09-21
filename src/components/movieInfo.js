import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
//import StreamMovie from "./streamMovie";
import "./home.css";
import { whileStatement } from "@babel/types";

//import downloat from 'downloat';
//import magnet2torrent from 'magnetorrent'

class movieInfo extends Component {
  state = {
    img: "",
    synopsis: "",
    title: "",
    torrentID: "",
    loading: true,
    opened: false,
    torrenthash: "",
    downloadLink: "",
    checkbox: true,

    comment:"",
    isTheMovieInFavorites:false
  };
  getLinksForDownload=()=>{
    const parseTorrent = require("parse-torrent");
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/movieApi/movieInfo/${this.props.match.params.id}`)
      .then(movies => {
        let Info = movies.data.movieInfo;
        console.log(Info);
        this.setState({
          img: Info.images.banner,
          title: Info.title,
          synopsis: Info.synopsis,
          torrentID: Info.torrents.en["1080p"].url,
          loading: false
        });
        this.setState({
          torrenthash: parseTorrent(this.state.torrentID).infoHash.toUpperCase()
        });
        this.setState({
          downloadLink: `https://yts.lt/torrent/download/${
            this.state.torrenthash
          }`
        });
      });
  }

  componentDidMount() {
   this.getLinksForDownload();
   setTimeout(()=>{  this.isMovieInFavorites();},500)
  }

  addToFavorites = e => {
    this.setState(
      {
        checkbox: !this.state.checkbox
      },
      () => {
        if (!this.state.checkbox) {

          axios
            .post(
              `${process.env.REACT_APP_BASEURL}/api/user/addToFavorites/${this.props.user._id}/${
                this.props.match.params.id
              }`,
              {}
            )
            .then(res => {
              // call the function to get the current user in App.js
              this.props.getUser();
              console.log(res);
            }); 
            this.setState({state:this.state})
        } else {

          this.props.user.favorites.forEach(ObjectIds => {
      
            axios
              .get(`${process.env.REACT_APP_BASEURL}/api/user/getMovie/${ObjectIds._id}`)
              .then(res => {
          
                if (this.props.match.params.id === res.data.movie) {
               
                  this.props.getUser();
                  this.props.deleteFromList(ObjectIds._id, this.props.user._id);
                }
                this.props.getUser();
              });
          });
        }
      }
    );
  };
  
  handleTextArea=(e)=>{
    this.setState({
      comment: e.target.value
    })
  }

  handleMovieReview=(e)=>{
    e.preventDefault();
    const comment = this.state.comment;
    this.props.user.favorites.forEach(async(movies)=>{
      if(movies.movies ===this.props.match.params.id ){
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/notes/createNote/${movies._id}`,{
          review:comment
        })
      }
    })
     
  } 

  isMovieInFavorites=()=>{
    if(this.props.user){
    this.props.user.favorites.forEach((movies)=>{
        if(movies.movies ===this.props.match.params.id ){
          this.setState({
            isTheMovieInFavorites:true
          }) 
        }
    }) 
  }
  }

  getInfoOfMovie = () => {
    const style={
      color:'white',
    }
    return (
      <div className="container infoOfMovies">
        <div className="titleAndSynopsis">
          <h1 className="titleInfo">{this.state.title}</h1>
          <p className="synopsis">{this.state.synopsis}</p>
          {/* <a className="btn downloadBtn " href={this.state.downloadLink}>
            Download
          </a> */}

          {this.props.user ? (
            // <form >
            <Fragment>
            <p>
              <label>
                <input type="checkbox" onChange={this.addToFavorites} />
                <span>Add to favorites</span>
              </label>
            </p> 
              {this.state.isTheMovieInFavorites?
              <Fragment>
                  <form onSubmit={this.handleMovieReview}>
                  <textarea type="text" placeholder="Add a review" style={style} onChange={this.handleTextArea} required></textarea>
                  <button  className="btn grey">submit</button>
                  </form>
                  <Link to={`/movieReview/${this.props.match.params.id}`}><button className="btn red">See Reviews</button></Link>
                  </Fragment>
                  :
                  <p></p>
              }
          
             
              </Fragment>
          ) : (
            // </form>
            <p />
          )}
        </div>

        <img className="bannerInfo" src={this.state.img} alt="" />
      </div>
    );
  };

 

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="progress white">
            <div className="indeterminate red" />
          </div>
        ) : (
          this.getInfoOfMovie()
        )}

        {/* <button to="/streamMovie" className="btn" onClick={this.showComponent}>watch</button> 
        {this.state.opened && <StreamMovie  link = {this.state.downloadLink}/>}   */}
      </div>
    );
  }
}
export default movieInfo;


 // showComponent = () => {
  //   this.setState({ opened: true });
  // };