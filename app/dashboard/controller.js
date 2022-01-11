import Category from "../category/model";
import Product from "../product/model";
import Customer from "../customer/model";
import Transaction from "../transaction/model";

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
