import { Router } from "express";
import { signup, signin, getUser } from "./controller";
import multer from "multer";
import os from "os";

const router = Router();

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);
router.post("/signin", signin);
router.get("/user", getUser);

export default router;
