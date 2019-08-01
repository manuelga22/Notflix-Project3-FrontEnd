import React, {Component} from "react";
import './userForms.css'
import Axios from "axios";
class signUp extends Component{
state = {
  username:"",
  password:""
}
signUp = (username,password)=>{
  Axios.post('http://localhost:5000/signup',{username:username, password:password})
  .then(response=> response.data)
}
tryToSignUp=(e)=>{
  e.preventDefault();
  const userName = this.state.usernameInput;
  const password = this.state.password;

  this.signUp()
  .then(()=>{
    this.props.getUser();
  })
}
render(){
  return(
    <div class = "userForm container hoverable">
      <h3>Create your Account</h3>
    
<div class="row">
    <form class="col s12" onSubmit={this.trySignUp}>
      <div class="row">
        <div class="input-field col s6">
          <input  id="first_name" type="text" class="validate" />
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate"/>
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate"/>
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" />
          <label for="email">Email</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Create
     <i class="material-icons right">done</i>
     </button>
    </form>
  </div>
        
  </div>

   
  );
}
}

export default signUp;