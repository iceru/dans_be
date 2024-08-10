const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const { getAll, findOne } = require("../controllers/position.controller");
const router = express.Router();

router.get("/position", verifyToken, getAll);
router.get("/position/:id", verifyToken, findOne);

module.exports = router;
