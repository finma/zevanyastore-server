import { Router } from "express";
import { getTransactions, getDetailTransaction } from "./controller";
import { isLoginCustomer } from "../middleware/auth";

const router = Router();

router.use(isLoginCustomer);
router.get("/", getTransactions);
router.get("/detail/:id", getDetailTransaction);

export default router;
