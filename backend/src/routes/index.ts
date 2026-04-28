import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/users.routes";
import gamesRoutes from "../modules/games/games.routes";
import playthroughRoutes from "../modules/playthroughs/playthroughs.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Operating: API is working; ver.0.0.0",
  });
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.use("/games", gamesRoutes);
router.use("/playthroughs", playthroughRoutes);

export default router;