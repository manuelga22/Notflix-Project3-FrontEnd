import React,{Fragment, Component}  from "react";
import {Link} from 'react-router-dom'
import './navBar.css'
import Axios from 'axios';
//import ShowResults from "./showResults";
//import displaySearch from   './displaySearch';
//import Icon from '@material-ui/core/Icon';
class navBar extends Component {
state={
  moviesToShow: [],
  searchValue: "",
}  


 doLogOut = () => {

  Axios.post(
    `${process.env.REACT_APP_BASEURL}/api/auth/logout`,
    {},
    { withCredentials: true }
  )
    .then(response => {
      console.log(response);
      this.props.getUser();
      this.props.emptyTheState();
      this.props.history.push('/')
      
    })  
    .catch(err => {
      console.log(err);
    });
}

searchBar=(e)=> {   
  
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
          <div className="nav-wrapper colorNav">
            <Link to="/" className="left logo"><span href="#" className="brand-logo left-align"><b>Notflix</b></span></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">  
                     
              {
               this.props.user ?
               <Fragment>
                  <li ><span className="welcomeUser ">Welcome {this.props.user.nickName}</span></li>
                  <li><button className="btn red" onClick={this.doLogOut}>Log-out</button></li>
                  <li><Link to="/favorites" ><button href="#" className="btn red">Favorites</button></Link></li>
                  <li><Link to="/profile"><button href="#" className="btn red">Profile</button></Link></li>  
               </Fragment>
                :
                <Fragment>
                    <li><Link to="/signUp"><button href="#" className="btn red">Sign-Up</button></Link></li>
                    <li><Link to="/logIn"><button href="#" className="btn red">Log-In</button></Link></li>
                </Fragment>
              }  

              <li>
                <nav className="searchBar ">
                  <div className="nav-wrapper searchBar white ">
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
