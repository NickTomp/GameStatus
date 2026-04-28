import { GameWithPlaythroughs } from "../games.types";
import { gameCompletedDTO } from "./game.completed.dto";

export const gameAbandonedDTO = (game: GameWithPlaythroughs) => {
  return {
    ...gameCompletedDTO(game),
  };
};