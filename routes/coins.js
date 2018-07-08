const express = require("express");
const router = express.Router({ mergeParams: true });
// const axios = require("axios");
// const bodyParser = require("body-parser");
// const AllCoins = require("../models/allCoin");
// const MyCoins = require("../models/myCoin");

const {
  createCoin,
  getMyCoin,
  deleteMyCoin
} = require("../handlers/MyCoins.js");
// const Coins = require("../models/coin.js");

// router.use(bodyParser.json());
// https://min-api.cryptocompare.com/

// GET route
// prefix - /api/users/:id/messages/:message_id
router.route("/").post(createCoin);

// DELETE route
// prefix - /api/users/:id/messages
router
  .route("/:coin_id")
  .get(getMyCoin)
  .delete(deleteMyCoin);
router.get("/allCoins", function(req, res, next) {
  AllCoins.find({})
    .then(console.log("======================================="))
    .then(console.log(res.data))
    .then(allCoinList => res.send(allCoinList))
    .catch(err => next(err));
});

// router.get("/", function(req, res, next) {
//   MyCoins.find({})
//     .then(console.log("======================================="))
//     .then(console.log(res.data))
//     .then(myCoinList => res.send(myCoinList))
//     .catch(err => next(err));
// });

// router.get("/:id", function(req, res, next) {
//   console.log("req.params", req.params.body);
//   MyCoins.findById(req.params)
//     .then(console.log("======================================="))
//     .then(console.log(res.data))
//     .then(myCoinList => res.send(myCoinList))
//     .catch(err => next(err));
// });

// router.post("/", function(req, res, next) {
//   console.log("router.post called");
//   MyCoins.create(req.body)
//     .then(coin => res.status(201).send(coin))
//     .catch(err => next(err));
// });

// router.delete("/:id", function(req, res, next) {
//   MyCoins.findByIdAndRemove(req.params.id)
//     .then(coin => res.send(coin))
//     .catch(err => next(err));
// });

module.exports = router;
