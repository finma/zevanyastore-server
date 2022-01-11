import Customer from "../customer/model.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config/index.js";

export const isLoginAdmin = async (req, res, next) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash("alertMessage", `Your session has expired, please signin`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  } else {
    next();
  }
};

export const isLoginCustomer = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;

    const data = jwt.verify(token, JWT_KEY);

    const customer = await Customer.findOne({ _id: data.customer.id });

    if (!customer) throw new Error();

    req.customer = customer;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({
      error: 1,
      message: "Not authorized to acces this resource",
    });
  }
};
