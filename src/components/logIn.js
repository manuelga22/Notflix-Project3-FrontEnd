import React, {Component} from "react";
import './userForms.css'

import Axios from "axios";

class LogIn extends Component{
  state = {
    username:"",
    password:"",
  }
  updateInputs = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  tryToLogin = (e) =>{
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
  
    Axios.post(`${process.env.REACT_APP_BASEURL}/route/login`, {
      username:username, 
      password:password,
    }, {withCredentials: true})
    .then(()=>{
      this.props.getUser();
      this.props.history.push('/')
    })
}

  render(){
   return(

    <div className= "logInCart font-color ">
     
     <form className="logIn hoverable font-color" onSubmit={this.tryToLogin}>
     <h2>Log-In</h2>
       <label  for="username"></label>
       <input name="username" placeholder="email" onChange={this.updateInputs} required></input>
       <label for="password"></label>
       <input name="password"placeholder="password" type="password" onChange={this.updateInputs} required></input>
       <button className="btn waves-effect waves-light red">log-in</button>
     </form>
    </div>
   );

  }



}

export default LogIn;