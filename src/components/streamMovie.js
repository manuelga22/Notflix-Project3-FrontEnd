import React, {Component} from "react";


class StreamMovie extends Component{
  state = {
    torrentInfoHash: "",
    torrentMagnetURI: "",
    torrentName: "",
    torrentProgress: "",
    torrentFiles: []
  }

componentDidMount() {
  // Sintel, a free, Creative Commons movie
  var torrentId = this.props.link;
  console.log(torrentId);
  var WebTorrent = require('webtorrent');
  var client = new WebTorrent();

  client.on('error', err => {
    console.log('[+] Webtorrent error: ' + err.message);
  });

  client.add(torrentId, (torrent) => {
    const interval = setInterval(() => {
      // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
      this.setState({torrentProgress: (torrent.progress * 100).toFixed(1) + '%'});
    }, 5000);
    torrent.on('done', () => {
      console.log('Progress: 100%');
      clearInterval(interval);
    })

    this.setState({
      torrentInfoHash: torrent.infoHash,
      torrentMagnetURI: torrent.magnetURI,
      torrentName: torrent.name,
      torrentFiles: torrent.files
    });

    // TODO Figure out a better way to render these files 
    this.state.torrentFiles.map((file, i) => {
      file.appendTo('body');
    })

  });
}


render() {
  return (
    <div>
      <h1>{this.state.torrentName}</h1>
      <p><b>Torrent Info Hash: </b>{this.state.torrentInfoHash}</p>
      <p><b>Torrent Progress: </b>{this.state.torrentProgress}</p>
    </div>
  );
}
}

export default StreamMovie;