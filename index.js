const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, console.log(`Server is running on port ${process.env.PORT}`));
