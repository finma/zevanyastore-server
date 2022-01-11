import Category from "../category/model.js";
import Product from "../product/model.js";
import Customer from "../customer/model.js";
import Transaction from "../transaction/model.js";

const pageName = "home";

export const index = async (req, res) => {
  try {
    const categories = await Category.countDocuments();
    const customers = await Customer.countDocuments();
    const transactions = await Transaction.countDocuments();
    const products = await Product.countDocuments();

    res.render("admin/dashboard/view_dashboard", {
      title: "Dashboard",
      categories,
      customers,
      products,
      transactions,
      pageName,
      name: req.session.user.name,
    });
  } catch (error) {
    console.log(error);
  }
};
