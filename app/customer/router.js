import { Router } from "express";
import { createTransaction } from "./controller.js";
import { isLoginCustomer } from "../middleware/auth.js";

const router = Router();

router.use(isLoginCustomer);
router.post("/transaction", createTransaction);

export default router;
