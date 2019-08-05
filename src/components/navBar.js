import React,{Fragment, Component}  from "react";
import {Link} from 'react-router-dom'
import './navBar.css'
import Axios from 'axios';
import ShowResults from "./showResults";
//import displaySearch from   './displaySearch';
//import Icon from '@material-ui/core/Icon';
class navBar extends Component {
state={
  moviesToShow: [],
  searchValue: "",
}  


 doLogOut = () => {
  Axios.post(
    "http://localhost:5000/logout",
    {},
    { withCredentials: true }
  )
    .then(response => {
      console.log(response);
      this.props.getUser();
      this.props.history.push('/')
    })  
    .catch(err => {
      console.log(err);
    });
}

searchBar=(e)=> {   
   e.preventDefault();
  this.props.history.push(`/showResults/${this.state.searchValue}`)
 }

 handleChange = (ev) => {
   this.setState({
    searchValue: ev.target.value
   })
 }



render(){
 
    return (
      <div>
      <div>
        <nav>
          <div className="nav-wrapper brown">
            <Link to="/"><a href="#" className="brand-logo"> Notflix</a></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">  
                     
              {
               this.props.user ?
               <Fragment>
                  <li>Welcome {this.props.user.nickName}</li>
                  <li><button className="btn" onClick={this.doLogOut}>Log-out</button></li>
                  <li><Link to="/profile"><a>Profile</a></Link></li>
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
                    <form onSubmit={this.searchBar}>
                      <div className="input-field">
                        <input id="search" onChange={this.handleChange} value={this.state.searchValue} type="search"/>
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
      </div>
    );
            }

}
export default navBar;
