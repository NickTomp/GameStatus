import { z } from "zod";

export const updateProfileSchema = z.object({
    username: z.string().min(2).max(30).optional(),

    bio: z.string().max(200).optional(),

    tag: z.string().min(3).max(20).optional(),

    currentPassword: z.string().min(6).optional(),

    newPassword: z.string().min(6).optional(),
}).refine(
    (data) => {
        if (data.newPassword && !data.currentPassword) {
            return false;
        }

        return true;
    },
    {
        message: "Current password is required to change password",
        path: ["currentPassword"],
    }
);