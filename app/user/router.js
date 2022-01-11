import { Router } from "express";
import { index, actionSignin, actionLogout } from "./controller";

const router = Router();

router.get("/", index);
router.post("/", actionSignin);
router.get("/logout", actionLogout);

export default router;
