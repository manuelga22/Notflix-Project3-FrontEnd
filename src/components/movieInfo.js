import React, { Component } from "react";
import axios from "axios";
//import { Link, Route, Switch } from "react-router-dom";
//import StreamMovie from "./streamMovie";
import "./home.css";

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
    checkbox: true
  };

  componentDidMount() {
    const parseTorrent = require("parse-torrent");
    axios
      .get(`http://localhost:5000/movieInfo/${this.props.match.params.id}`)
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

  addToFavorites = e => {
    this.setState(
      {
        checkbox: !this.state.checkbox
      },
      () => {
        if (!this.state.checkbox) {
          axios
            .post(
              `http://localhost:5000/addToFavorites/${this.props.user._id}/${
                this.props.match.params.id
              }`,
              {}
            )
            .then(res => {
              console.log(res);
            }); 
        } else {
          console.log(this.props);
          this.props.user.favorites.forEach(ObjectIds => {
            console.log("looping");
            axios
              .get(`http://localhost:5000/getMovie/${ObjectIds}`)
              .then(res => {
                if (this.props.match.params.id === res.data.movie) {
                  console.log("deleting");
                  console.log("objectId", ObjectIds);
                  console.log("user Id", this.props.user._id);
                  console.log(
                    "moviesId",
                    this.props.match.params.id,
                    res.data.movie
                  );
                  this.props.deleteFromList(ObjectIds, this.props.user._id);
                }
              });
          });
        }
      }
    );
  };

  getInfoOfMovie = () => {
    return (
      <div className="container infoOfMovies">
        <div className="titleAndSynopsis">
          <h1 className="titleInfo">{this.state.title}</h1>
          <p className="synopsis">{this.state.synopsis}</p>
          <a className="btn downloadBtn" href={this.state.downloadLink}>
            Download
          </a>

          {this.props.user ? (
            // <form >
            <p>
              <label>
                <input type="checkbox" onChange={this.addToFavorites} />
                <span>Add to favorites</span>
              </label>
            </p>
          ) : (
            // </form>
            <p />
          )}
        </div>

        <img className="bannerInfo" src={this.state.img} alt="" />
      </div>
    );
  };

  showComponent = () => {
    this.setState({ opened: true });
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
