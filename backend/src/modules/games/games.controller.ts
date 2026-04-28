import { Request, Response } from "express";
import {
  createGame,
  getUserGames,
  getGameById,
  updateGame,
  deleteGame,
  moveGameStatus,
} from "./games.service";
import { getParam } from "../../utils/express";
import { createGameSchema, updateGameSchema } from "./games.validation";

export const create = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const parsed = createGameSchema.parse(req.body);
  const game = await createGame(userId, parsed);


  res.status(201).json(game);
};

export const getAllByUser = async (req: Request, res: Response) => {
  const userId = getParam(req.params.userId);

  const games = await getUserGames(userId);

  res.json(games);
};

export const getOne = async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const game = await getGameById(id);

  res.json(game);
};

export const update = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const id = getParam(req.params.id);
  const parsed = updateGameSchema.parse(req.body);

  const game = await updateGame(id, userId, parsed);

  res.json(game);
};

export const remove = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const id = getParam(req.params.id);

  const result = await deleteGame(id, userId);

  res.json(result);
};

//Смена статуса
export const moveStatus = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).userId;
  const gameId = getParam(req.params.id);

  const { status } = req.body;

  const game = await moveGameStatus(
    gameId,
    userId,
    status
  );

  res.json(game);
};