import { Router } from "express";
import {
    create,
    getByGame,
    remove,
} from "./playthroughs.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, create);

router.get(
    "/game/:gameId",
    authMiddleware,
    getByGame
);

router.delete(
    "/:id",
    authMiddleware,
    remove
);

export default router;