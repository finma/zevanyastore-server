import { Router } from "express";
import { isLoginAdmin } from "../middleware/auth.js";
import { index } from "./controller.js";

const router = Router();

router.use(isLoginAdmin);
router.get("/", index);

export default router;
