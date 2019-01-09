const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/Users");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    created: today
  };
  User.findOne({
    email: req.body.email
  })

    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + "registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error : " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          //Passwords Match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.json({ error: user });
        }
      } else {
        res.json({ error: user });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exists");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.delete("/:userId", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  if (decoded) {
    User.remove({ _id: decoded._id })
      .exec()
      .then(result => {
        return res.status(200).json({ message: "User deleted" });
      })
      .catch(err => next(err));
  }
});

users.put("/:userId", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  console.log(req.headers.authorization);
  // const userData = {
  //   first_name: req.body.first_name,
  //   last_name: req.body.last_name,
  //   email: req.body.email
  // };

  const payload = {
    _id: req.params._id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  let token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 1440
  });

  User.update(
    { _id: req.params.userId },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
  ).exec();
  res.send(token);
});

module.exports = users;
