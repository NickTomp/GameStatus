import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../../utils/ApiError";
import { comparePassword, hashPassword } from "../../utils/password";
import { UpdateProfileData } from "./users.types";

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
};

export const getUserByTag = async (tag: string) => {
    const user = await prisma.user.findUnique({
        where: { tag },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
};

export const updateUserProfile = async (
    userId: string,
    data: UpdateProfileData
) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (data.tag && data.tag !== user.tag) {
        const existingTag = await prisma.user.findUnique({
            where: { tag: data.tag },
        });

        if (existingTag) {
            throw new ApiError(400, "Tag already in use");
        }
    }

    let passwordToSave: string | undefined;

    if (data.newPassword) {
        if (!data.currentPassword) {
            throw new ApiError(400, "Current password is required");
        }

        const isValidPassword = await comparePassword(
            data.currentPassword,
            user.password
        );

        if (!isValidPassword) {
            throw new ApiError(
                401,
                "Current password is incorrect"
            );
        }

        passwordToSave = await hashPassword(data.newPassword);
    }

    const updateData = {
        ...(data.username !== undefined && {
            username: data.username,
        }),

        ...(data.bio !== undefined && {
            bio: data.bio,
        }),

        ...(data.tag !== undefined && {
            tag: data.tag,
        }),

        ...(passwordToSave !== undefined && {
            password: passwordToSave,
        }),
    };

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });

    const { password, ...safeUser } = updatedUser;
    return safeUser;
};

export const updateAvatar = async (
    userId: string,
    avatarUrl: string
) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { avatarUrl },
    });

    const { password, ...safeUser } = user;
    return safeUser;
};