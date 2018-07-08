const db = require("../models");

exports.createCoin = async function(req, res, next) {
  console.log(
    "handlers/myCoins.js - createCoin req, res, next -- REQ -",
    req.body,
    "REQ.PARAMS",
    req.params,
    "RES",
    res.body
  );
  try {
    let coin = await db.MyCoins.create({
      purchDate: req.body.purchDate,
      symbol: req.body.symbol,
      name: req.body.name,
      baseCurrency: req.body.baseCurrency,
      price: req.body.price,
      amount: req.body.amount,
      user: req.params.id
    });
    console.log("handlers/myCoins.js - coin", coin);
    console.log("handlers/myCoins.js - req.params", req.params);
    let foundUser = await db.User.findById(req.params.id);
    console.log("handlers/myCoins.js - foundUser", foundUser);
    foundUser.myCoins.push(coin.id);
    await foundUser.save();
    let foundCoin = await db.MyCoins.findById(coin._id).populate("user", {
      username: true
    });
    return res.status(200).json(foundCoin);
  } catch (err) {
    return next(err);
  }
};

//  GET - /api/users/:id/coins/:message_id
exports.getMyCoin = async function(req, res, next) {
  try {
    let coin = await db.MyCoins.find(req.params.coin_id);
    return res.status(200).json(coin);
  } catch (err) {
    return next(err);
  }
};

// DELETE - /api/users/:id/coins/:message_id
exports.deleteMyCoin = async function(req, res, next) {
  try {
    let foundMyCoin = await db.MyCoins.findById(req.params.coin_id);
    await foundMyCoin.remove();
    return res.status(200).json(foundMyCoin);
  } catch (err) {
    return next(err);
  }
};
