const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createToken, verifyExpiration } = db.authToken;

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await db.User.findOne({
      where: { username },
    });
    if (userExists) {
      return res.status(400).send("Username already exists");
    }
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          "Password must be at least 8 characters long and contain at least one alphabet character."
        );
    }

    await db.User.create({
      username,
      password: await bcrypt.hash(password, 15),
    });
    return res.status(200).send("Registration Success");
  } catch (err) {
    return res.status(500).send(`Something went wrong: ${err}`);
  }
};

const signInUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(404).json("Username not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res
        .status(400)
        .json("Incorrect username and password combination");
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    let refreshToken = await createToken(user);

    res.status(200).send({
      id: user.id,
      username: user.username,
      accessToken: token,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).send(`Sign in error ${err}`);
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).send("Refresh Token is required!");
  }

  try {
    let refreshToken = await db.authToken.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      res.status(403).send("Invalid refresh token");
      return;
    }
    if (verifyExpiration(refreshToken)) {
      db.authToken.destroy({ where: { id: refreshToken.id } });
      res
        .status(403)
        .send("Refresh token was expired. Please make a new sign in request");
      return;
    }

    const user = await db.User.findOne({
      where: { id: refreshToken.user },
      attributes: {
        exclude: ["password"],
      },
    });
    let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  registerUser,
  signInUser,
  refreshToken,
};
