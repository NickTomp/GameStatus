import { GameWithPlaythroughs } from "./games.types";

import { gameWishlistDTO } from "./dto/game.wishlist.dto";
import { gamePlayingDTO } from "./dto/game.playing.dto";
import { gameCompletedDTO } from "./dto/game.completed.dto";
import { gameAbandonedDTO } from "./dto/game.abandoned.dto";

export const gameResponse = (game: GameWithPlaythroughs) => {
  switch (game.status) {
    case "wishlist": {
      const { playthroughs, ...cleanGame } = game;
      return gameWishlistDTO(cleanGame);
    }
    case "playing":
      return gamePlayingDTO(game);

    case "completed":
      return gameCompletedDTO(game);

    case "abandoned":
      return gameAbandonedDTO(game);

    default:
      return gameWishlistDTO(game);
  }
};