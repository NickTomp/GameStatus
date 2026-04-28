import { z } from "zod";

export const createGameSchema = z.object({
    title: z.string().min(1),
    series: z.string().optional(),
    posterUrl: z.url().optional(),
    description: z.string().optional(),

    genre: z.string().optional(),

    releaseDate: z.coerce.date().optional(), // можно потом перевести в Date

    status: z.enum(["wishlist", "playing", "completed", "abandoned"]),

    personalRating: z.number().min(0).max(10).optional(),

    pros: z.string().optional(),
    cons: z.string().optional(),

    category: z.enum(["masterpiece", "good", "normal", "other"]).optional(),
});

export const updateGameSchema = z.object({
    title: z.string().min(1).optional(),
    series: z.string().optional(),
    posterUrl: z.url().optional(),
    description: z.string().optional(),

    genre: z.string().optional(),
    releaseDate: z.coerce.date().optional(),

    status: z.enum(["wishlist", "playing", "completed", "abandoned"]).optional(),

    personalRating: z.number().min(0).max(10).optional(),

    pros: z.string().optional(),
    cons: z.string().optional(),

    category: z.enum(["masterpiece", "good", "normal", "other"]).optional(),
});

export const moveGameSchema = z.object({
  status: z.enum([
    "wishlist",
    "playing",
    "completed",
    "abandoned",
  ]),
});