const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cryptoCoin",
  {
    keepAlive: true
  }
);

module.exports.User = require("./user");
module.exports.MyCoins = require("./myCoin");
module.exports.AllCoins = require("./allCoin");
