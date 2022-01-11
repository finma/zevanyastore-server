import { Router } from "express";
import { createTransaction } from "./controller";
import { isLoginCustomer } from "../middleware/auth";

const router = Router();

router.use(isLoginCustomer);
router.post("/transaction", createTransaction);

export default router;
