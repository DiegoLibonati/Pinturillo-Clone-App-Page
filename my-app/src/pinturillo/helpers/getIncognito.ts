export const getIncognito = (word: string, countdown: number) => {
  let finalWord = "";

  if (countdown > 75) {
    for (const letter of word) {
      finalWord += "_";
    }
  } else {
    for (const letter of word) {
      if (
        letter === "a" ||
        letter === "e" ||
        letter === "i" ||
        letter === "o" ||
        letter === "u"
      ) {
        finalWord += letter;
        continue;
      }
      finalWord += "_";
    }
  }

  return finalWord;
};
