import Payment from "./model.js";

const pageName = "payment";

export const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const payments = await Payment.find();

    res.render("admin/payment/view_payment", {
      title: "Payment",
      name: req.session.user.name,
      payments,
      pageName,
      alert,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

export const viewCreate = async (req, res) => {
  try {
    res.render("admin/payment/create", {
      title: "Create Payment",
      name: req.session.user.name,
      pageName,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

export const actionCreate = async (req, res) => {
  try {
    const { name, bankName, noRekening, type } = req.body;

    const payment = await Payment({ name, bankName, noRekening, type });

    payment.save();

    req.flash("alertMessage", "Success create payment");
    req.flash("alertStatus", "success");

    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

export const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({ _id: id });

    res.render("admin/payment/edit", {
      title: "Update Payment",
      name: req.session.user.name,
      payment,
      pageName,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

export const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bankName, noRekening, type } = req.body;

    await Payment.findByIdAndUpdate(
      { _id: id },
      { name, bankName, noRekening, type }
    );

    req.flash("alertMessage", "Success update payment");
    req.flash("alertStatus", "success");

    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

export const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;

    await Payment.findByIdAndRemove({ _id: id });

    req.flash("alertMessage", "Success delete payment");
    req.flash("alertStatus", "success");

    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

//? API
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      error: 0,
      message: "success get payments",
      data: { payments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};
