import { Router } from "express";
import {
    getMe,
    getByTag,
    updateProfile,
    uploadAvatar,
} from "./users.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

// текущий пользователь
router.get("/me", authMiddleware, getMe);

// поиск по tag
router.get("/tag/:tag", getByTag);

// обновление профиля
router.put("/me", authMiddleware, updateProfile);

// загрузка аватара
router.post(
    "/me/avatar",
    authMiddleware,
    upload.single("avatar"),
    uploadAvatar
);

export default router;