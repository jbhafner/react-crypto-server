require("dotenv").config(); // process.env.____
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const errorHandler = require("./handlers/error");
const coinRoutes = require("./routes/coins");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
// app.use("/api/coins", coinRoutes);
app.use("/api/users/:id/myCoins", loginRequired, ensureCorrectUser, coinRoutes);

app.get("/api/coins/", loginRequired, async function(req, res, next) {
  try {
    let myCoins = await db.MyCoins.find()
      .sort({
        symbol: "desc"
      })
      .populate("user", {
        username: true
      });
    return res.status(200).json(myCoins);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const port = 3025;
app.listen(port, function() {
  console.log("server started on port", port);
});
