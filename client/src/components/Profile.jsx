import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { onDelete } from "./UserFunction";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      errors: {}
    };
  }

  userDelete = e => {
    e.preventDefault();
    onDelete(this.state._id).then(res => {
      localStorage.removeItem("usertoken");
      this.props.history.push("/");
    });
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      _id: decoded._id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    });
    console.log(this.state._id);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Profile</h1>
          </div>
          <div className="text-center">
            <input
              name="first_name"
              onChange={this.onChange}
              placeholder={this.state.first_name}
            />
            <input
              name="last_name"
              onChange={this.onChange}
              placeholder={this.state.last_name}
            />
            <input
              name="email"
              onChange={this.onChange}
              placeholder={this.state.email}
            />
          </div>
        </div>
        <button onClick={this.userDelete.bind(this)}>DELETE ACCOUNT</button>
      </div>
    );
  }
}

export default Profile;
