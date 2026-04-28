import { GameWithPlaythroughs } from "../games.types";
import { gameBaseDTO } from "./game.base.dto";

export const gamePlayingDTO = (game: GameWithPlaythroughs) => {
  return {
    ...gameBaseDTO(game),

    rating: game.personalRating,
    pros: game.pros,
    cons: game.cons,

    playthroughs: game.playthroughs ?? [],
  };
};