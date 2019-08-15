import React, { Component } from "react";
import "./userForms.css";
import Axios from "axios";
class signUp extends Component {
  state = {
    message:null,
    username: "",
    password: "",
    nickName: "",
    password2: "",
    newImage: null,
    user: {}
  };

  tryToSignUp = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const nickName = this.state.nickName;
    const password2 = this.state.password2;
    const theImage = this.state.newImage;

    let userInfo = new FormData();
    userInfo.append('username',username );
    userInfo.append('password', password);
    userInfo.append('nickName', nickName);
    userInfo.append('password2', password2);
    userInfo.append('image', theImage);
  
    Axios.post(
      `${process.env.REACT_APP_BASEURL}/api/auth/signup`,
       userInfo,{ headers: {
        'Content-Type': 'multipart/form-data',
      }, withCredentials: true }
    ).then(response => {
      this.props.getUser();
      
      this.setState(
        {
          user: response.data.user
        },
        () => {
          this.props.history.push("/");
        }
      );
    }).catch((res)=>console.log(res));
  };
  handleError=()=>{

  }
  updateUser = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateFileInState = e => {

    this.setState({newImage: e.target.files[0]});

  };

  render() {
    return (
      <div className="userForm container hoverable">
        <h3>Create your Account</h3>

        <div className="row">
          <form className="col s12" onSubmit={this.tryToSignUp}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Name"
                  id="nickName"
                  name="nickName"
                  type="text"
                  class="validate"
                  onChange={e => this.updateUser(e)}
                />
                <label htmlfor="nickName" />
              </div>
              <div className="input-field col s12">
                <label>Add a profile Picture</label>
                <input
                  type="file"
                  class="validate"
                  name="image"
                  onChange={this.updateFileInState}
                />
              </div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="text"
                  name="username"
                  placeholder="email"
                  class="validate"
                  onChange={e => this.updateUser(e)}
                />
                <label htmlfor="email" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="enter password"
                  class="validate"
                  onChange={e => this.updateUser(e)}
                />
                <label htmlfor="password" />
              </div>
              <div className="input-field col s12">
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="confirm password"
                  class="validate"
                  onChange={e => this.updateUser(e)}
                />
                <label htmlfor="password2" />
              </div>
            </div>
            <div className="row" />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Create
              <i className="material-icons right">done</i>
            </button>
          </form>
        </div>
       {this.state.message?
         <div>
           {this.handleError()}
        </div>
        :
        <p></p>
       }

      </div>
    );
  }
}

export default signUp;
