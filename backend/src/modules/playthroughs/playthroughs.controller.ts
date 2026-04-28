import { Request, Response } from "express";
import {
  createPlaythrough,
  getPlaythroughsByGame,
  deletePlaythrough,
} from "./playthroughs.service";
import { getParam } from "../../utils/express";
import { createPlaythroughSchema } from "./playthroughs.validation";

export const create = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const parsed = createPlaythroughSchema.parse(req.body);
  const playthrough = await createPlaythrough(userId, {
    ...parsed,
    playedAt: new Date(req.body.playedAt),
  });

  res.status(201).json(playthrough);
};

export const getByGame = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const gameId = getParam(req.params.gameId);

  const playthroughs = await getPlaythroughsByGame(
    gameId,
    userId
  );

  res.json(playthroughs);
};

export const remove = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const id = getParam(req.params.id);

  const result = await deletePlaythrough(id, userId);

  res.json(result);
};