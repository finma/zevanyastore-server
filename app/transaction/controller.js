import Transaction from "./model";

const pageName = "transaction";

export const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const transactions = await Transaction.find();

    res.render("admin/transaction/view_transaction", {
      title: "Transaction",
      name: req.session.user.name,
      transactions,
      pageName,
      alert,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/transaction");
  }
};

export const setStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    console.log(req);

    if (status === "success") {
      await Transaction.findByIdAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "Success accept transaction");
      req.flash("alertStatus", "success");

      res.redirect("/transaction");
    } else {
      await Transaction.findByIdAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "Success reject transaction");
      req.flash("alertStatus", "success");

      res.redirect("/transaction");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/transaction");
  }
};

//? API
export const getTransactions = async (req, res) => {
  try {
    const { status = "" } = req.params;

    let criteria = {};

    if (status.length) {
      criteria = {
        ...criteria,
        status: {
          $regex: `${status}`,
          $options: "i",
        },
      };
    }

    if (req.customer._id) {
      criteria = {
        ...criteria,
        customer: req.customer._id,
      };
    }

    const transactions = await Transaction.find(criteria);

    let total = await Transaction.aggregate([
      {
        $match: criteria,
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      error: 0,
      message: "success get transactions",
      data: { transactions, total: total.length ? total[0].totalPrice : 0 },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};

export const getDetailTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({ _id: id });

    if (!transaction) {
      return res
        .status(404)
        .json({ error: 1, message: "History transaction not found!" });
    }

    res.status(200).json({
      error: 0,
      message: "success get detail transaction",
      data: transaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};
