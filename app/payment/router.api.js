import { Router } from "express";
import { getPayments } from "./controller";

const router = Router();

router.get("/", getPayments);

export default router;
