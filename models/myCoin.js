const mongoose = require("mongoose");
const User = require("./user");

console.log("myCoin.js called");
const myCoinsSchema = new mongoose.Schema(
  {
    purchDate: String,
    symbol: String,
    name: String,
    baseCurrency: String,
    price: Number,
    amount: Number,
    total: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

myCoinsSchema.pre("remove", async function(next) {
  console.log("myCoinsSchema.pre(remove)");
  try {
    // find a user
    let user = await User.findById(this.user);
    console.log("models/myCoin.js/user", user);
    // remove the id of the message from their messages list
    user.myCoins.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const MyCoins = mongoose.model("MyCoins", myCoinsSchema);

module.exports = MyCoins;
