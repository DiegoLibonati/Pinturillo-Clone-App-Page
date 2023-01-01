import { useEffect, useState } from "react";

interface MediaMatchHook {
  matchMediaQuery: boolean;
}

interface WindowMediaQuery {
  matches: boolean;
}

export const useMediaMatch = (): MediaMatchHook => {
  const [mediaQuery, setMediaQuery] = useState<WindowMediaQuery>({
    matches: window.innerWidth >= 1024 ? true : false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", setMediaQuery);

    return () => mediaQuery.removeEventListener("change", setMediaQuery);
  }, []);

  return {
    matchMediaQuery: mediaQuery.matches,
  };
};
