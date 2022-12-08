import React, { useEffect } from "react";

export const useMediaMatch = () => {
  const [mediaQuery, setMediaQuery] = React.useState<any>({
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
