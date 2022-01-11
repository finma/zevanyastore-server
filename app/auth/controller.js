import Customer from "../customer/model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config/index.js";

export const signup = async (req, res) => {
  try {
    const payload = req.body;

    const customer = await Customer({ ...payload });

    await customer.save();

    delete customer._doc.password;

    res
      .status(201)
      .json({ error: 0, message: "signup success", data: customer });
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.status(422).json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email: email });

    if (customer) {
      const checkPassword = bcryptjs.compareSync(password, customer.password);

      if (checkPassword) {
        const token = jwt.sign(
          {
            customer: {
              id: customer._id,
              email: customer.email,
              name: customer.name,
              phoneNumber: customer.phoneNumber,
            },
          },
          JWT_KEY
        );

        res
          .status(201)
          .json({ error: 0, message: "signin success", data: { token } });
      } else {
        res.status(403).json({ error: 1, message: "Password invalid" });
      }
    } else {
      res.status(403).json({ error: 1, message: "Email not registered" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });

    next();
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;

    const data = jwt.verify(token, JWT_KEY);

    const customer = await Customer.findOne({ _id: data.customer.id });

    res.status(201).json({
      error: 0,
      message: "success get user",
      data: { name: customer.name },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};
