const express = require("express");
const {
  registerUser,
  signInUser,
  refreshToken,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signInUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
