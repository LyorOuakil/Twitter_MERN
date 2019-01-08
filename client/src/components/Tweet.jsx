import React, { Component } from "react";
import { publishPost } from "./MessageFunction";
import { getAllMessages } from "./MessageFunction";
import jwt_decode from "jwt-decode";

class Tweet extends Component {
  constructor() {
    super();
    this.state = {
      _userId: "",
      message: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  publishTweet = e => {
    e.preventDefault();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const post = {
      _userId: decoded._id,
      message: this.state.message
    };
    publishPost(post).then(res => {
      if (res) {
        console.log("CONGRATS");
      }
    });
  };

  componentDidMount() {
    getAllMessages().then(res => {
      if (res) {
        const listMessages = res.data.map(d => (
          <li key={d._id}>{d.message}</li>
        ));
        this.setState({
          messages: listMessages
        });
        console.log(listMessages);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">Your Post</h1>
            </div>
            <div className="text-center">
              <input
                size="50"
                name="message"
                onChange={this.onChange}
                placeholder="Write your tweet here..."
              />
              <button onClick={this.publishTweet.bind(this)}>
                Publish tweet
              </button>
            </div>
          </div>
          <ul>{this.state.messages}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Tweet;
