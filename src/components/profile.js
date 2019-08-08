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
    image:null
  };

  updateFileInState = (e)=>{
    this.setState({image: e.target.files[0]});
  }

  printTheUserInfo = () => {
    if (this.props.user) {
      return (
        <div className="ProfileInfo ">
          <img className="ProfilePicture" src={this.props.user.image} alt=""></img>
          <div className="profileInfo2">
          <h3><b>Name:</b> {this.props.user.nickName}</h3>
          <h4><b>Email:</b> {this.props.user.username}</h4>
       
         
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
    const thenickName = this.state.nickName;
    const theUserName = this.state.username;
    const theImage = this.state.image;
    Axios.post(`http://localhost:5000/user/edit/${this.props.user._id}`, {
      nickName: thenickName,
      username: theUserName,
      image: theImage
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
                <label>Change your profile picture</label>
                <input type="file" onChange={this.updateFileInState} />
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
        <button onClick={this.deleteUser} className="btn deleteBtn">
              Delete Your Profile
        </button>
      </Fragment>
    );
  }
}
export default Profile;
