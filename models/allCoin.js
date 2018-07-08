const mongoose = require("mongoose");

const allCoinsSchema = new mongoose.Schema(
  {
    //   _id: String,
    //   id: Number,
    name: String
    //   symbol: String,
    //   website_slug: String
  },
  { collection: "allCoinList" }
);

const AllCoins = mongoose.model("AllCoins", allCoinsSchema);

module.exports = AllCoins;
