import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../../utils/ApiError";
import { gameResponse } from "./game.response";

export const createGame = async (
  ownerId: string,
  data: any
) => {
  const game = await prisma.game.create({
    data: {
      ownerId,
      ...data,
    },
  });

  return gameResponse(game);
};

export const getUserGames = async (
  userId: string
) => {
  const games = await prisma.game.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      playthroughs: true,
    },
  });

  return games.map(gameResponse);
};

export const getGameById = async (
  gameId: string
) => {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      playthroughs: true,
    },
  });

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  return gameResponse(game);
};

export const updateGame = async (
  gameId: string,
  userId: string,
  data: any
) => {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  if (game.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  const updated = await prisma.game.update({
    where: { id: gameId },
    data,
  });

  return gameResponse(updated);
};

export const deleteGame = async (
  gameId: string,
  userId: string
) => {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  if (game.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  await prisma.game.delete({
    where: { id: gameId },
  });

  return { success: true };
};

//Смена статуса
export const moveGameStatus = async (
  gameId: string,
  userId: string,
  newStatus:
    | "wishlist"
    | "playing"
    | "completed"
    | "abandoned"
) => {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  if (game.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  //ВАЖНО: здесь можно добавить правила переходов (пока свободно)
  const updatedGame = await prisma.game.update({
    where: { id: gameId },
    data: {
      status: newStatus,
    },
  });

  return gameResponse(updatedGame);
};