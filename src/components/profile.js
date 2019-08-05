import React, { Component, Fragment } from "react";
import { Modal, Button } from "react-materialize";
import "materialize-css";
import Axios from "axios";

class Profile extends Component {
  trigger = <Button>Edit</Button>;
  state = {
    nickName: "",
    username: ""
  };
  printTheUserInfo = () => {
    if (this.props.user) {
      return (
        <Fragment>
          <h3>{this.props.user.nickName}</h3>
          <h4>{this.props.user.username}</h4>
        </Fragment>
      );
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log([e.target.name], e.target.value);
  };
  
  update = e => {
    const thenickName = this.state.nickName;
    const theUserName = this.state.username;
    Axios.post(`http://localhost:5000/user/edit/${this.props.user._id}`, {
      nickName: thenickName,
      username: theUserName
    })
      .then(() => {
        console.log("updating user info");
      })
      .catch(err => console.log(err));
  };

  deleteUser=()=>{
    Axios.post(`http://localhost:5000/user/delete/${this.props.user._id}`)
    .then(()=>{
      this.props.getUser();
      this.props.history.push('/');
    }).catch((err)=>console.log(err))
  }

 render() {
    return (
      <Fragment>
        {this.printTheUserInfo()}
        <Modal header="Edit Your Profile Information" trigger={this.trigger}>
          <form onSubmit={e => this.update(e)}>
            {this.props.user ? (
              <Fragment>
                <label for="username" />
                <input
                  name="username"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  value={this.state.username}
                />

                <label for="nickName" />
                <input
                  name="nickName"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  value={this.state.nickName}
                />

                <button className="btn">Submit</button>
              </Fragment>
            ) : (
              <p>there is no user logged in</p>
            )}
         
          </form>
        </Modal>
        <button onClick={this.deleteUser} className="btn">
              Delete
            </button>
      </Fragment>
    );
  }
}
export default Profile;
