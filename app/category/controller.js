import Category from "./model";

const pageName = "category";

export const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const categories = await Category.find();

    res.render("admin/category/view_category", {
      title: "Category",
      categories,
      pageName,
      alert,
      name: req.session.user.name,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

export const viewCreate = async (req, res) => {
  try {
    res.render("admin/category/create", {
      title: "Create Category",
      name: req.session.user.name,
      pageName,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

export const actionCreate = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category({ name });

    category.save();

    req.flash("alertMessage", "Success create category");
    req.flash("alertStatus", "success");

    res.redirect("/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

export const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    res.render("admin/category/edit", {
      title: "Edit Category",
      name: req.session.user.name,
      category,
      pageName,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

export const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.findByIdAndUpdate({ _id: id }, { name });

    req.flash("alertMessage", "Success update category");
    req.flash("alertStatus", "success");

    res.redirect("/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

export const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndRemove({ _id: id });

    req.flash("alertMessage", "Success delete category");
    req.flash("alertStatus", "success");

    res.redirect("/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

//? API
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res
      .status(200)
      .json({
        error: 0,
        message: "success get categories",
        data: { categories },
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};
