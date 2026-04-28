import { Game } from "@prisma/client";
import { gameBaseDTO } from "./game.base.dto";

export const gameWishlistDTO = (game: Game) => {
  return {
    ...gameBaseDTO(game),
  };
};