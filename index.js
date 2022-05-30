var compression = require("compression");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/errorMiddleware");
const logger = require("morgan");
const dbConnect = require("./config/config");

const Admin = require("./routes/Admin/index");

const { json } = require("body-parser");

const app = express();

// Init environment
dotenv.config();

app.use(compression());

app.use(logger("dev"));
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

dbConnect();

app.use("/api/v1/admin", Admin);

// 404 error
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

//  starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(
    `🚀 Server is running at (==> http://localhost:${process.env.PORT} on ${process.env.MODE} Mode <==)`
  );
});
