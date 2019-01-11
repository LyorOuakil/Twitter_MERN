import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { onDelete } from "./UserFunction";
import { updateUser } from "./UserFunction";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  userUpdate = e => {
    e.preventDefault();
    const user = {
      _id: this.state._id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    console.log("Account modified");
    updateUser(user, this.state._id).then(res => {
      if (res) {
        console.log("account modified");
        this.props.history.push("/profile");
      }
    });
  };

  userDelete = e => {
    e.preventDefault();
    const confirm = window.confirm(
      "Do you really want to delete your account ?"
    );
    if (confirm === true) {
      onDelete(this.state._id).then(res => {
        localStorage.removeItem("usertoken");
        this.props.history.push("/");
      });
    }
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
              value={this.state.first_name}
            />
            <input
              name="last_name"
              onChange={this.onChange}
              value={this.state.last_name}
            />
            <input
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
        </div>
        <button onClick={this.userDelete.bind(this)}>DELETE ACCOUNT</button>
        <button onClick={this.userUpdate.bind(this)}>Update Account</button>
      </div>
    );
  }
}

export default Profile;
