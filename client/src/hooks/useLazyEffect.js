import { useEffect } from "react";

const useLazyEffect = (effect, deps, delay = 500) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);
};

export default useLazyEffect;
