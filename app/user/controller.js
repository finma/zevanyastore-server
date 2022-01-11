import User from "./model.js";
import bcryptjs from "bcryptjs";

const pageName = "user";

export const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    if (req.session.user === null || req.session.user === undefined) {
      res.render("admin/user/view_signin", {
        title: "Sign In",
        pageName,
        alert,
      });
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  }
};

export const actionSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (user.status === "Y") {
        const checkPassword = await bcryptjs.compare(password, user.password);

        if (checkPassword) {
          req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            status: user.status,
          };

          res.redirect("/dashboard");
        } else {
          req.flash("alertMessage", `Password is wrong`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Your status is not active`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } else {
      req.flash("alertMessage", `Email not found`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  }
};

export const actionLogout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
