const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { body } = req;
  const { username, password } = body

  const user = await User.findOne({ username })

  const correctPassword = user === null 
    ? false 
    : bcrypt.compare(password, user.passwordHash);

  if (!(user && correctPassword)) {
    res.status(401).json({
      error: "invalid user or password",
    });
  }

  const userForToken = {
    id: user.userId,
    username: user.email,
  };

  const token = jwt.sign(userForToken, "123");

  res.send({
    name: user.firstname,
    username: user.email,
    token,
  });
});

module.exports = loginRouter;
