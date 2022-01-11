import { Router } from "express";
import multer from "multer";
import os from "os";
import { isLoginAdmin } from "../middleware/auth.js";
import {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
} from "./controller.js";

const router = Router();

router.use(isLoginAdmin);
router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);
router.get("/edit/:id", viewEdit);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  actionEdit
);
router.delete("/delete/:id", actionDelete);

export default router;
