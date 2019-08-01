import React from "react";
import {Link} from 'react-router-dom'
import './navBar.css'
//import axios from 'axios';
//import displaySearch from './displaySearch';
//import Icon from '@material-ui/core/Icon';
function navBar(props) {

    return (
      <div>
        <nav>
          <div className="nav-wrapper brown">
            <Link><a  className="brand-logo">
              Notflix
            </a></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">     
              <li> 
                <Link to="/signUp"><a>Sign-Up</a></Link>
              </li>
              <li>
                <a href="collapsible.html">Log-In</a>
              </li>
              <li>
                <nav className="searchBar ">
                  <div className="nav-wrapper searchBar ">
                    <form onSubmit={props.search}>
                      <div className="input-field">
                        <input id="search" type="search"  onChange={props.search}/>
                        <label className="label-icon" htmlFor="search">
                          <i className="material-icons black-text">search</i>
                        </label>
                        <i className="material-icons black-text">close</i>
                      </div>
                    </form>
                  </div>
                </nav>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );

}
export default navBar;
