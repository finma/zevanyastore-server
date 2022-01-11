import { Router } from "express";
import { isLoginAdmin } from "../middleware/auth";
import { index, setStatus } from "./controller";

const router = Router();

router.use(isLoginAdmin);
router.get("/", index);
router.put("/status/:id", setStatus);

export default router;
