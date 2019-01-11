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
      onDelete(messageId).then(res => {
        this.componentDidMount();
      });
    }
  };

  editTweet = messageId => e => {
    e.preventDefault();
    window.confirm(
      "hello, t'as cru que ca allait éditer des trucs ? Naif que tu es ... "
    );
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    console.log(decoded.Followers);
    getAllMessages().then(res => {
      if (res) {
        const listMessages = res.data.map(d => (
          <div key={d._id} className="card">
            {decoded.Followers.indexOf(d.userId) > -1 ? (
              <React.Fragment>
                <strong>{d.username}</strong> a tweeté :
                <div className="card bg-primary">
                  <div className="card-body">
                    {this.state.tokenId === d.userId ? (
                      <input
                        type="text"
                        onChange={this.onChange}
                        name="editText"
                        value={d.message}
                      />
                    ) : (
                      <li className="list-group-item">{d.message}</li>
                    )}
                    <footer className="blockquote-footer text-right">
                      {d.date} <br />{" "}
                      {this.state.tokenId === d.userId ? (
                        <button onClick={this.deleteTweet(d._id)}>
                          Delete your message{" "}
                        </button>
                      ) : (
                        <button style={{ display: "none" }}>not worked </button>
                      )}
                      {this.state.tokenId === d.userId ? (
                        <button onClick={this.editTweet(d._id)}>Edit</button>
                      ) : (
                        <p style={{ display: "none" }}> Not worked </p>
                      )}
                    </footer>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div style={{ display: "none" }}> </div>
            )}
          </div>
        ));
        this.setState({
          tokenId: decoded._id,
          messages: listMessages
        });
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
