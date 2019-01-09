import React, { Component } from "react";
import { publishPost } from "./MessageFunction";
import { getAllMessages } from "./MessageFunction";
import { onDelete } from "./MessageFunction";
import jwt_decode from "jwt-decode";

class Tweet extends Component {
  constructor() {
    super();
    this.componentDidMount();
    this.state = {
      messageId: "",
      tokenId: "",
      _userId: "",
      username: "",
      message: []
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /* Add tweet function -> userId given thanks to the token */

  publishTweet = e => {
    e.preventDefault();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const post = {
      _userId: decoded._id,
      _username: decoded.first_name,
      message: this.state.message
    };
    publishPost(post).then(result => {
      this.componentDidMount();
    });
  };

  deleteTweet = messageId => e => {
    e.preventDefault();
    const confirm = window.confirm(
      "Do you really want to delete this comment ?"
    );
    if (confirm === true) {
      console.log("This was validated");
      onDelete(messageId).then(res => {
        this.componentDidMount();
      });
    }
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    getAllMessages().then(res => {
      if (res) {
        const listMessages = res.data.map(d => (
          <div key={d._id} className="card">
            <div className="card-header bg-primary text-light">
              <strong>{d.username}</strong> a tweeté :{" "}
            </div>
            <div className="card-body">
              <li className="list-group-item">{d.message}</li>
              <footer className="blockquote-footer text-right">
                {d.userId}
                <br />
                {this.state.tokenId === d.userId ? (
                  <button onClick={this.deleteTweet(d._id)}>
                    Delete your message
                  </button>
                ) : (
                  <button style={{ display: "none" }}>not worked </button>
                )}
              </footer>
            </div>
          </div>
        ));
        this.setState({
          tokenId: decoded._id,
          messages: listMessages
        });
        console.log(this.state.tokenId);
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
          <ul className="list-group list-group-flush">{this.state.messages}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Tweet;
