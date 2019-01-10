import React, { Component } from "react";
import { getTwittos } from "./UserFunction";

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

  componentDidMount() {
    getTwittos().then(res => {
      if (res) {
        const listUsers = res.data.map(d => (
          <div key={d._id} className="card">
            <div className="card-header">
              <strong>{d.first_name}</strong>
            </div>
            <div className="card-body">
              <button>Follow</button>
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
