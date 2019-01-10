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

export const onDelete = messageId => {
  return axios
    .delete("http://127.0.0.1:3000/messages/" + messageId)
    .then(res => {});
};

export const updateMessage = (messageId, message) => {
  console.log("message dans MessageFunction : " + message);
  return axios
    .put("http://127.0.0.1:3000/messages/" + messageId, {
      message: message.message
    })
    .then(res => {
      return res.data;
    });
};
