import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, password, tag } = req.body;

  const data = await registerUser(email, password, tag);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: false, // позже true в production
  });

  res.json({
    accessToken: data.accessToken,
    user: data.user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await loginUser(email, password);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: false,
  });

  res.json({
    accessToken: data.accessToken,
    user: data.user,
  });
};