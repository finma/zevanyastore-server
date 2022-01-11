import Product from "./model";
import Category from "../category/model";
import fs from "fs";
import path from "path";
import { rootPath } from "../../config";

const pageName = "product";

export const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const products = await Product.find();

    res.render("admin/product/view_product", {
      title: "Product",
      name: req.session.user.name,
      products,
      pageName,
      alert,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/product");
  }
};

export const viewCreate = async (req, res) => {
  try {
    const categories = await Category.find();

    res.render("admin/product/create", {
      title: "Create Product",
      name: req.session.user.name,
      categories,
      pageName,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/product");
  }
};

export const actionCreate = async (req, res) => {
  try {
    const { name, stock, price, category, description } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = `${req.file.filename}.${originalExt}`;
      let target_path = path.resolve(rootPath, `public/uploads/${filename}`);

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          const product = await Product({
            name,
            stock,
            price,
            category,
            image: filename,
            description,
          });

          await product.save();

          req.flash("alertMessage", "Success create product");
          req.flash("alertStatus", "success");

          res.redirect("/product");
        } catch (error) {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/product");
        }
      });
    } else {
      const product = await Product({
        name,
        stock,
        price,
        category,
        description,
      });

      await product.save();

      req.flash("alertMessage", "Success create product");
      req.flash("alertStatus", "success");

      res.redirect("/product");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/product");
  }
};

export const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id }).populate("category");
    const categories = await Category.find();

    res.render("admin/product/edit", {
      title: "Update Product",
      name: req.session.user.name,
      product,
      categories,
      pageName,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/product");
  }
};

export const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price, category, description } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = `${req.file.filename}.${originalExt}`;
      let target_path = path.resolve(rootPath, `public/uploads/${filename}`);

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          const product = await Product.findOne({ _id: id });

          let currentImage = `${rootPath}/public/uploads/${product.image}`;

          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          await Product.findOneAndUpdate({
            name,
            stock,
            price,
            category,
            image: filename,
            description,
          });

          req.flash("alertMessage", "Success update product");
          req.flash("alertStatus", "success");

          res.redirect("/product");
        } catch (error) {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/product");
        }
      });
    } else {
      await Product.findOneAndUpdate({
        name,
        stock,
        price,
        category,
        description,
      });

      req.flash("alertMessage", "Success update product");
      req.flash("alertStatus", "success");

      res.redirect("/product");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/product");
  }
};

export const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndRemove({ _id: id });

    let currentImage = `${rootPath}/public/uploads/${product.image}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    req.flash("alertMessage", "Success delete product");
    req.flash("alertStatus", "success");

    res.redirect("/product");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/product");
  }
};

//? API
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res
      .status(200)
      .json({ error: 0, message: "success get products", data: { products } });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};

export const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id }).populate("category");

    if (!product) {
      return res.status(404).json({ error: 1, message: "Product not found" });
    }

    res.status(200).json({
      error: 0,
      message: "success get detail product",
      data: { product },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};

export const getProductsBySearch = async (req, res) => {
  try {
    const { keyword } = req.query;

    const criteria = {
      $or: [
        {
          name: {
            $regex: `${keyword}`,
            $options: "i",
          },
        },
        {
          category: {
            $regex: `${keyword}`,
            $options: "i",
          },
        },
      ],
    };

    const products = await Product.aggregate([
      {
        $match: criteria,
      },
    ]);

    if (products.length === 0) {
      return res.status(404).json({ error: 1, message: "Product not found" });
    }

    res.status(200).json({
      error: 0,
      message: "success get products",
      data: { products },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};
