export const getSortMayorToMinor = (a, b) => {
  return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
};
