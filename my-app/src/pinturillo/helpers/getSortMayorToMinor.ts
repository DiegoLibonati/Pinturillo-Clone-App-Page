import { User } from "../../types/types";

export const getSortMayorToMinor = (a: User, b: User): number => {
  return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
};
