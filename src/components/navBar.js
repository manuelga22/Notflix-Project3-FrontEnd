import React,{Fragment}  from "react";
import {Link} from 'react-router-dom'
import './navBar.css'
import Axios from 'axios';
//import displaySearch from   './displaySearch';
//import Icon from '@material-ui/core/Icon';
function navBar(props) {
  console.log("user",props.user);

function doLogOut(){
  props.logout();
}
    return (
      <div>
        <nav>
          <div className="nav-wrapper brown">
            <Link to="/"><a href="#" className="brand-logo"> Notflix</a></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down"> 
            
              {
              
                props.user ?
               <Fragment>
                  <li>Welcome {props.user.nickName}</li>
                  <li><button className="btn" onClick={doLogOut}>Log-out</button></li>
                  <li><a>Profile</a></li>
               </Fragment>
                :
                <Fragment>
                    <li><Link to="/signUp"><a>Sign-Up</a></Link></li>
                    <li><Link to="/logIn"><a>Log-In</a></Link></li>
                </Fragment>
              }
     
          
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
