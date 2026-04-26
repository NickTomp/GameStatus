import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Operating: API is working; ver.0.0.0",
  });
});

export default router;