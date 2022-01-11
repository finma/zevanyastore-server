import { Router } from "express";
import {
  getProducts,
  getDetailProduct,
  getProductsBySearch,
} from "./controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/detail/:id", getDetailProduct);
router.get("/search", getProductsBySearch);

export default router;
