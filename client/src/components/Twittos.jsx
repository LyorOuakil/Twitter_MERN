import React, { Component } from "react";
import { getTwittos, addFollowers } from "./UserFunction";
import jwt_decode from "jwt-decode";

class TwittosUser extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      users: []
    };
  }
  addFollowers = userFollowedId => e => {
    e.preventDefault();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    addFollowers(decoded._id, userFollowedId);
  };

  componentDidMount() {
    getTwittos().then(res => {
      if (res) {
        const listUsers = res.data.map(d => (
          <div key={d._id} className="card">
            <div className="card-header">
              <strong>{d.first_name}</strong>
            </div>
            <div className="card-body">
              <button onClick={this.addFollowers(d._id)}>Follow</button>
              <button>Unfollow</button>
            </div>
          </div>
        ));
        this.setState({
          users: listUsers
        });
      }
    });
    console.log(this.state.users);
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">The tweetos community </h1>
            </div>
            <ul className="list-group list-group-flush">{this.state.users}</ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TwittosUser;
