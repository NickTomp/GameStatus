import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  tag: z.string().min(3).max(20),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});