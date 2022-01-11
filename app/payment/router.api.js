import { Router } from "express";
import { getPayments } from "./controller.js";

const router = Router();

router.get("/", getPayments);

export default router;
