import { Game } from "@prisma/client";

export const toGameDTO = (game: Game) => {
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

// Виды отображения по категориям
export const toPlayingDTO = (game: Game) => {
  return {
    ...toGameDTO(game),

    rating: game.personalRating,
    pros: game.pros,
    cons: game.cons,

    playthroughs: true, // placeholder (позже подключим relation)
  };
};

export const toCompletedDTO = (game: Game) => {
  return {
    ...toGameDTO(game),

    rating: game.personalRating,
    pros: game.pros,
    cons: game.cons,
    category: game.category,

    playthroughs: true,
  };
};

export const toAbandonedDTO = (game: Game) => {
  return {
    ...toCompletedDTO(game),
    status: "abandoned",
  };
};

export const toWishlistDTO = (game: Game) => {
  return {
    ...toGameDTO(game),
  };
};

//DISPATCHER!
export const mapGame = (game: Game) => {
  switch (game.status) {
    case "wishlist":
      return toWishlistDTO(game);

    case "playing":
      return toPlayingDTO(game);

    case "completed":
      return toCompletedDTO(game);

    case "abandoned":
      return toAbandonedDTO(game);

    default:
      return toGameDTO(game);
  }
};