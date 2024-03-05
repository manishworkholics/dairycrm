const mongoose = require("mongoose");

const dailyentriesSchema = new mongoose.Schema(
  {
    customerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    // productId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Product",
    // },
    productName:{
      type: String,
      default: 0,
    },
    productAmount: {
      type: Number,
      default: 0,
    },
    todayquantity: {
      type: Number,
      default: 0,
    },
    totalcalculatedamount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,      
    }, 
  },
  { timestamps: true }
);

const Dailyentries = mongoose.model("Dailyentries", dailyentriesSchema);
module.exports = { Dailyentries };
