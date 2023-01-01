import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { setWord } from "../../store/exports";
import { replaceChar } from "../exports";

export const useIncognito = (
  misteryWord: string = ""
): { wordToGuess: string | undefined } => {
  const dispatch = useAppDispatch();
  const { word, countdown } = useAppSelector((state) => state.game);
  const { uniqueLettersFromWord, wordToGuess } = word;

  const getIncognito = () => {
    const getRandomLetter =
      uniqueLettersFromWord![
        Math.floor(Math.random() * uniqueLettersFromWord!.length)
      ];

    for (const [index, letter] of Array.from(misteryWord).entries()) {
      if (letter === getRandomLetter) {
        dispatch(
          setWord({ wordToGuess: replaceChar(wordToGuess, letter, index) })
        );
        continue;
      }
    }

    dispatch(
      setWord({
        uniqueLettersFromWord: uniqueLettersFromWord?.filter(
          (letter) => letter !== getRandomLetter
        ),
      })
    );
  };

  useEffect(() => {
    if (misteryWord) {
      dispatch(
        setWord({
          wordToGuess: misteryWord.replace(/[a-zA-Z]/g, "_"),
          uniqueLettersFromWord: [...new Set(Array.from(misteryWord))],
        })
      );
    }
  }, [misteryWord]);

  useEffect(() => {
    if (
      (countdown === 75 ||
        countdown === 60 ||
        countdown === 45 ||
        countdown === 30 ||
        countdown === 15 ||
        countdown === 10 ||
        countdown === 5) &&
      uniqueLettersFromWord!.length > 2
    ) {
      getIncognito();
    }
  }, [countdown]);

  return { wordToGuess };
};
