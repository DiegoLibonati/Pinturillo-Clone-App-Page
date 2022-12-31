export const randomWords = (list: Array<string>): string => {
  const randomWord = list[Math.floor(Math.random() * list.length)];

  return randomWord;
};
