import { Game } from "@prisma/client";
import { GameWithPlaythroughs } from "../games.types";

export const gameBaseDTO = (game: Game) => {
  return {
    id: game.id,
    title: game.title,
    series: game.series,
    posterUrl: game.posterUrl,
    description: game.description,
    genre: game.genre,
    releaseDate: game.releaseDate,
    status: game.status,
  };
};