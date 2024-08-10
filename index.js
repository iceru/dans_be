const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth.routes");
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", authRoute);

app.listen(port, console.log(`Server is running on port ${port}`));
