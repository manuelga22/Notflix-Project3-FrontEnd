import React, { Component } from "react";
import axios from "axios";
import "resetPassword.css"
class ResetPassword extends Component {



 render() {
   return (
      <div className="resetPassword">
      <form>
      <input name="password"/>
      <input name="confirm"/>
      <button className= "btn"> Submit</button>
      </form>
      </div>
    );
   }
}

export default ResetPassword;
