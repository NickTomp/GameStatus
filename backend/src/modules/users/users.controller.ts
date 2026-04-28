import { Request, Response } from "express";
import { TagParams } from "./users.types";
import { getUserById, getUserByTag, updateUserProfile, updateAvatar } from "./users.service";

export const getMe = async (
    req: Request,
    res: Response
) => {
    const userId = (req as any).userId;

    const user = await getUserById(userId);

    res.json(user);
};

export const getByTag = async (
    req: Request<TagParams>,
    res: Response
) => {
    const { tag } = req.params;

    const user = await getUserByTag(tag);

    res.json(user);
};

export const updateProfile = async (
    req: Request,
    res: Response
) => {
    const userId = (req as any).userId;

    const user = await updateUserProfile(
        userId,
        req.body
    );

    res.json(user);
};

export const uploadAvatar = async (
    req: Request,
    res: Response
) => {
    const userId = (req as any).userId;

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await updateAvatar(
        userId,
        avatarUrl
    );

    res.json(user);
};