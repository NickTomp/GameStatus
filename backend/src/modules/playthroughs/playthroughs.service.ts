import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../../utils/ApiError";

export const createPlaythrough = async (
  userId: string,
  data: {
    gameId: string;
    playedAt: Date;
    hoursSpent: number;
    review?: string;
  }
) => {
  const game = await prisma.game.findUnique({
    where: { id: data.gameId },
  });

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  if (game.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  return prisma.playthrough.create({
    data: {
      gameId: data.gameId,
      playedAt: data.playedAt,
      hoursSpent: data.hoursSpent,
      review: data.review,
    },
  });
};

export const getPlaythroughsByGame = async (
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

  return prisma.playthrough.findMany({
    where: { gameId },
    orderBy: {
      playedAt: "desc",
    },
  });
};

export const deletePlaythrough = async (
  playthroughId: string,
  userId: string
) => {
  const playthrough = await prisma.playthrough.findUnique({
    where: { id: playthroughId },
    include: {
      game: true,
    },
  });

  if (!playthrough) {
    throw new ApiError(404, "Playthrough not found");
  }

  if (playthrough.game.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  await prisma.playthrough.delete({
    where: { id: playthroughId },
  });

  return { success: true };
};