import { Router } from "express";
import { isLoginAdmin } from "../middleware/auth.js";
import { index, setStatus } from "./controller.js";

const router = Router();

router.use(isLoginAdmin);
router.get("/", index);
router.put("/status/:id", setStatus);

export default router;
