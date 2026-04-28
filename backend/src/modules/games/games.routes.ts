import { Router } from "express";
import {
  create,
  getAllByUser,
  getOne,
  update,
  remove,
  moveStatus,
} from "./games.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, create);

router.get("/user/:userId", getAllByUser);

router.get("/:id", getOne);

router.put("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, remove);

router.patch("/:id/move", authMiddleware, moveStatus);

export default router;