import { GameWithPlaythroughs } from "../games.types";
import { gameBaseDTO } from "./game.base.dto";

export const gameCompletedDTO = (game: GameWithPlaythroughs) => {
  return {
    ...gameBaseDTO(game),

    rating: game.personalRating,
    pros: game.pros,
    cons: game.cons,
    category: game.category,

    playthroughs: game.playthroughs ?? [],
  };
};