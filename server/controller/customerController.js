const { customer } = require("../modal/customerModal");
const { Dailyentries } = require("../modal/dailyentries");

exports.addcustomer = async (req, res) => {
  try {
    const data = await customer.create(req.body);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};
// 
exports.getcustomer = async (req, res) => {
  try {
    const data = await customer.find().populate({
      path: "product",
      populate: { path: "product_name", model: "Product" }, // Assuming the field is named 'product_id' in dailyEntries
    }); 
  
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

// exports.getcustomerbyId = async (req, res) => {
//     try {
//         const data = await customer.findById({ _id: req.params.id })
//         res.status(200).json({
//             success: true,
//             data
//         })
//     } catch (error) {
//         res.send(error)
//     }
// }

exports.getcustomerbyId = async (req, res) => {
  try {
    const customerId = req.params.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    let filter = { _id: customerId };

    if (startDate && endDate) {
      // Adjust the date filter to include entries on the start date and exclude entries on the end date
      filter["dailyEntries.date"] = {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000), // Add one day to include entries up to the end of the specified day
      };
    }

    const data = await customer.findOne(filter);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatecustomer = async (req, res) => {
  try {
    const data = await customer.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.deletecustomer = async (req, res) => {
  try {
    const data = await customer.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.addentry = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, products } = req.body;

    const buyer = await customer.findById(id);
    if (!buyer) return res.status(404).send("Buyer not found");

    buyer.dailyEntries.push({ date, products });
    await buyer.save();

    res.status(200).send(buyer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.report = async (req, res) => {
  try {
    const { id } = req.params;

    const buyer = await customer.findById(id);
    if (!buyer) return res.status(404).send("Buyer not found");

    const monthlyReport = buyer.dailyEntries.reduce((acc, entry) => {
      const month = new Date(entry.date).getMonth() + 1; // 1-based month

      entry.products.forEach((product) => {
        acc[month] = acc[month] || {};
        acc[month][product.type] =
          (acc[month][product.type] || 0) + product.quantity;
      });

      return acc;
    }, {});

    res.status(200).send(monthlyReport);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addallentry = async (req, res) => {
  try {
    const { dailyEntries } = req.body;

    if (!dailyEntries || !Array.isArray(dailyEntries)) {
      return res.status(400).send("Invalid data format");
    }

    for (const entry of dailyEntries) {
      const { id, date, products } = entry;

      const buyer = await customer.findById(id);
      if (!buyer) continue;

      buyer.dailyEntries.push({ date, products });
      await buyer.save();
      // dailyentries
      const prd_length = products.length;
      let i;
      for (i = 0; i < prd_length; i++) {
        const dailyentries2 = await Dailyentries.create({
          customerid: id,
          productName: products[i].type,
          productAmount: products[i].price,
          todayquantity: products[i].quantity,
          date,
          totalcalculatedamount: products[i].price * products[i].quantity,
        });

        // Update Daily Entry Amount Start
        const get_single_user = await customer.findById(id);
        const get_daily_entry_amount = get_single_user.dailyentryamount;
        const today_amount = products[i].price * products[i].quantity;
        const sum_old_new_amount =
          parseInt(get_daily_entry_amount) + parseInt(today_amount);
        const updateamountuser = await customer.findByIdAndUpdate(
          id,
          { dailyentryamount: sum_old_new_amount },
          { new: true }
        );

        // Update Daily Entry Amount End
      }
    }

    res.status(200).send("Bulk daily entries added successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};
// Cron run on last date 31 at 11pm
exports.generateBillForMonthByUserId = async (req, res) => {
  try {
    const get_all_user = await customer.find();
    let cust = 0;
    for (cust = 0; cust < get_all_user.length; cust++) {
      const userid = get_all_user[cust]._id;

      // const { userid, startDate, endDate } = req.body;
      //   const user_id = await customer.findById(userid);

      const user_detail = await customer.findById(userid);
      const currentDate = new Date();
      // Get the year and month from the current date
      // CURRENT MONTH KE LIYEEEEE START============= WORKING 1 FOR CURRENT MONTH
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      // CURRENT MONTH KE LIYEEEEE END===============

      //  const fromdate = "2024-02-01";
      //  const todate = "2024-02-31";
      const fromdate = startDate;
      const todate = endDate;

      const findallentries = await Dailyentries.find({
        customerid: userid,
        date: { $gte: fromdate, $lte: todate },
      });
      let totalSum = 0;

      findallentries.forEach((entry) => {
        totalSum += entry.totalcalculatedamount;
      });

      const get_user_dueamount = parseInt(user_detail.dueamount);
      const sum_old_new_amount = get_user_dueamount + totalSum;
      const updateamountuser = await customer.findByIdAndUpdate(
        userid,
        { dueamount: sum_old_new_amount },
        { new: true }
      );
    }
    res.status(200).send({
      // startDate,
      // endDate,
      // totalSum,
      // findallentries,
      message: "Data Found",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.userpayamount = async (req, res) => {
  try {
    const { userid, billmonth, amountpay } = req.body;
    const user_detail = await customer.findById(userid);

    const get_user_dueamount = parseInt(user_detail.dueamount);
    const due_amount = get_user_dueamount - amountpay;

    const updateamountuser = await customer.findByIdAndUpdate(
      userid,
      {
        dueamount: due_amount,
        oldpendingamount: due_amount,
        $push: {
          paymenthistory: {
            billmonth: billmonth,
            totalamountpaidtoday: amountpay,
            amountdueagain: due_amount,
          },
        },
      },
      { new: true }
    );
    res.status(200).send({message:"Update successfully"});
  } catch (error) {
    res.status(400).send(error);
  }
};
