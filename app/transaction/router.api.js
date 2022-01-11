import { Router } from "express";
import { getTransactions, getDetailTransaction } from "./controller.js";
import { isLoginCustomer } from "../middleware/auth.js";

const router = Router();

router.use(isLoginCustomer);
router.get("/", getTransactions);
router.get("/detail/:id", getDetailTransaction);

export default router;
