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
    userId: req.body.userId,
    message: req.body.message,
    date: today
  };
  Message.create(messageData).then(message => {
    res.json({ status: "Message created " });
  });
});

messages.get("/message", (req, res) => {
  Message.find({}, function(err, messages) {
    if (err) {
      res.send("something went wrong");
      next();
    }
    console.log(messages);
    res.json(messages);
  });
});

module.exports = messages;
