export type CreatePlaythroughDTO = {
  gameId: string;
  playedAt: Date;
  hoursSpent: number;
  review?: string;
};