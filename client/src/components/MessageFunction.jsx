import axios from "axios";

export const publishPost = newPost => {
  return axios
    .post("http://127.0.0.1:3000/messages/message", {
      userId: newPost._userId,
      username: newPost._username,
      message: newPost.message
    })
    .then(res => {
      console.log("New Post published");
    });
};

export const getAllMessages = () => {
  return axios.get("http://127.0.0.1:3000/messages/message");
};
