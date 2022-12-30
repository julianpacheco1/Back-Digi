const express = require("express");
const dotenv = require("dotenv");

const bodyparser = require("body-parser");
const router = require("./api/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./api/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api", router);
//log requests
app.use(morgan("tiny"));

//mongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
