export const getIncognito = (word: string) => {
  let finalWord = "";

  for (const letter of word) {
    finalWord += "_";
  }

  return finalWord;
};
