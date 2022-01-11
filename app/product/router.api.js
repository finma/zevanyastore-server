import { Router } from "express";
import {
  getProducts,
  getDetailProduct,
  getProductsBySearch,
} from "./controller";

const router = Router();

router.get("/", getProducts);
router.get("/detail/:id", getDetailProduct);
router.get("/search", getProductsBySearch);

export default router;
