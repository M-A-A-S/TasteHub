import { useEffect } from "react";
import { useLanguage } from "./useLanguage";

export const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useLanguage(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
