import React, {Component} from "react";
import './userForms.css'
import Axios from "axios";
class signUp extends Component{
state = {
  username:"",
  password:"",
  nickName:"",
  password2:"",
  user : {},
}
tryToSignUp = (e)=>{
  e.preventDefault()
  const username = this.state.username;
  const password = this.state.password;
  const nickName = this.state.nickName;
  const password2= this.state.password2;
  console.log("GOING TO THE BACK END", username, password, nickName)

  Axios.post('http://localhost:5000/signup',
  {
    username:username, 
    password:password,
    nickName:nickName,
    password2: password2
  },{withCredentials:true})
  .then(response=> {
    this.props.getUser();

    this.setState({
      user:response.data.user
    }, () => {
      this.props.history.push('/')
    })
  })
} 
updateUser=e=>{
 console.log(e.target.name);
  this.setState({
    [e.target.name]: e.target.value,
  })
}


render(){
  return(
    <div className = "userForm container hoverable">
      <h3>Create your Account</h3>
    
<div className="row">
    <form className="col s12" onSubmit={this.tryToSignUp}>
      <div className="row">
         <div className="input-field col s12">
          <input placeholder="Name" id="nickName" name="nickName" type="text" class="validate" onChange={e=>this.updateUser(e)}/>
          <label htmlfor="nickName"></label>
         </div>
          <div className="input-field col s12">
          <input id="email" type="text" name="username" placeholder="email" class="validate" onChange={e=>this.updateUser(e)}/>
          <label htmlfor="email"></label>
          </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" name="password" placeholder="enter password" class="validate"  onChange={e => this.updateUser(e)} />
          <label htmlfor="password"></label>
        </div>
        <div className="input-field col s12">
          <input id="password2" type="password" name="password2" placeholder="confirm password" class="validate"  onChange={e => this.updateUser(e)} />
          <label htmlfor="password2"></label>
        </div>
      </div>
      <div className="row">
   
      </div>
     <button className="btn waves-effect waves-light" type="submit" name="action">Create
     <i className="material-icons right">done</i>
     </button>
    </form>
  </div>
    
  </div>  
  );
}
}

export default signUp;