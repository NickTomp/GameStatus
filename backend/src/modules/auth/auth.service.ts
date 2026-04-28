import { prisma } from "../../prisma/prisma.client";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { ApiError } from "../../utils/ApiError";

export const registerUser = async (
    email: string,
    password: string,
    tag: string
) => {
    //Проверка по логину(Email)
    const exists = await prisma.user.findUnique({
        where: { email },
    });

    if (exists) {
        throw new ApiError(400, "User already exists");
    }
    //Проверка по tag
    const existingTag = await prisma.user.findUnique({
        where: { tag },
    });

    if (existingTag) {
        throw new ApiError(400, "Tag already exists");
    }

    const hash = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hash,
            tag,
        },
        select: {
            id: true,
            email: true,
            tag: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { user, accessToken, refreshToken };
};

export const loginUser = async (
    email: string,
    clientPassword: string
) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isValid = await comparePassword(
        clientPassword,
        user.password
    );

    if (!isValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    
    //Отбрасываю passwordHash из ответа клиенту
    const { password: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
};