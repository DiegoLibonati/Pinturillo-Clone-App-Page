import { useEffect, useState } from "react";

export const useCountdown = (time: number) => {
  const [countdown, setCountdown] = useState(time);

  useEffect(() => {
    if (countdown !== 0) {
      const timeoutCountdown = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timeoutCountdown);
    }
  }, [countdown]);

  return { countdown };
};
