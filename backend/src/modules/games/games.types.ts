import { Game, Playthrough } from "@prisma/client";

export type GameStatus =
  | "wishlist"
  | "playing"
  | "completed"
  | "abandoned";

export type GameCategory =
  "masterpiece"
  | "good"
  | "normal"
  | "other";

export type GameWithPlaythroughs = Game & {
  playthroughs?: Playthrough[];
};