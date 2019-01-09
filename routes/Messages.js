const express = require("express");
const messages = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const Message = require("../models/Messages");
messages.use(cors());

process.env.SECRET_KEY = "secret";

messages.post("/message", (req, res) => {
  const today = new Date();
  const messageData = {
    username: req.body.username,
    userId: req.body.userId,
    message: req.body.message,
    date: today
  };
  Message.create(messageData).then(message => {
    res.json({ status: "Message created " });
    console.log(message);
  });
});

messages.get("/message", (req, res) => {
  Message.find({})
    .sort("-date")
    .exec(function(err, messages) {
      if (err) {
        res.send("something went wrong");
        next();
      }
      res.status(200).json(messages);
    });
});

messages.delete("/:messageId", (req, res) => {
  Message.remove({ _id: req.params.messageId })
    .exec()
    .then(result => {
      return res.status(200).json({ message: "Message deleted" });
    })
    .catch(err => next(err));
});

module.exports = messages;
