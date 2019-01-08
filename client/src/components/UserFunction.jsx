import axios from "axios";

export const register = newUser => {
  return axios
    .post("http://127.0.0.1:3000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log("Registered !");
    });
};

export const login = user => {
  return axios
    .post("http://127.0.0.1:3000/users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const onDelete = userId => {
  return axios.delete("http://127.0.0.1:3000/users/" + userId).then(res => {});
};

export const updateUser = (userModified, userId) => {
  console.log("hello");
  console.log(userId);
  return axios
    .put(
      "http://127.0.0.1:3000/users/" + userId,
      {
        first_name: userModified.first_name,
        last_name: userModified.last_name,
        email: userModified.email,
        password: "test"
      },
      {
        headers: {
          Authorization: localStorage.usertoken
        }
      }
    )
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    });
};
