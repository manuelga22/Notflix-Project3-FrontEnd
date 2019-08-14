import React, {Component}  from 'react';
import "./home.css"

class Footer extends Component{
render(){
return (
  <footer className="page-footer dark grey darken-3 footerConfiguration">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Third Project made by Manuel Garcia</h5>
          <p className="grey-text text-lighten-4">
            Download movies for free in 1080p
          </p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text"></h5>
          <ul>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
               
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
                
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
             
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
              
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </footer>
);

}



}
export default Footer;