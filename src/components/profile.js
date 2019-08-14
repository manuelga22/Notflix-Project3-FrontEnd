import React, { Component, Fragment } from "react";
import { Modal, Button } from "react-materialize";
import "materialize-css";
import Axios from "axios";
import "./Profile.css";

class Profile extends Component {
  trigger = <Button>Edit</Button>;
  state = {
    nickName: "",
    username: "",
    newimage: ""
  };

  updateFileInState = e => {
    console.log(e.target.files[0]);
    this.setState({ newimage: e.target.files[0] });
  };

  printTheUserInfo = () => {
    if (this.props.user) {
      return (
        <div className="ProfileInfo ">
          <img className="ProfilePicture" src={this.props.user.image} alt="" />
          <div className="profileInfo2">
            <h3>
              <b>Name:</b> {this.props.user.nickName}
            </h3>
            <h4>
              <b>Email:</b> {this.props.user.username}
            </h4>
          </div>
        </div>
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
    e.preventDefault();
    const thenickName = this.state.nickName;
    const theUserName = this.state.username;
    const theImage = this.state.newimage;

    let theRequest= new FormData();
    theRequest.append('username', thenickName);
    theRequest.append('nickName', theUserName);
    theRequest.append('imageUrl',this.state.newimage);

    Axios.post(`${process.env.REACT_APP_BASEURL}/route/user/edit/${this.props.user._id}`, theRequest)
      .then(() => {
        console.log("updating user info");
        this.props.getUser();
      })
      .catch(err => console.log(err));
  };

  deleteUser = () => {
    Axios.post(`${process.env.REACT_APP_BASEURL}/route/user/delete/${this.props.user._id}`)
      .then(() => {
        this.props.getUser();
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    var style = {
      color: "black"
    };
    return (
      <Fragment>
        {this.printTheUserInfo()}
        <Modal header="Edit Your Profile Information" trigger={this.trigger}>
          <form onSubmit={this.update} style={style}>
            {this.props.user ? (
              <Fragment>
                <label for="name">Change your profile picture</label>
                <input
                  type="file"
                  name="imageUrl"
                  onChange={this.updateFileInState}
                />

                <label for="username" />
                <input
                  name="username"
                  type="email"
                  onChange={e => this.handleChange(e)}
                  placeholder={this.props.user.username}
                  style={style}
                  required
                />

                <label for="nickName" />
                <input
                  name="nickName"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  placeholder={this.props.user.nickName}
                  style={style}
                  required
                />

                <button className="btn">Submit</button>
              </Fragment>
            ) : (
              <p>there is no user logged in</p>
            )}
          </form>
        </Modal>
        <button onClick={this.deleteUser} className="btn deleteBtn">
          Delete Your Profile
        </button>
      </Fragment>
    );
  }
}
export default Profile;
