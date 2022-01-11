import { Router } from "express";
import { isLoginAdmin } from "../middleware/auth";
import { index } from "./controller";

const router = Router();

router.use(isLoginAdmin);
router.get("/", index);

export default router;
