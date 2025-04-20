import { useCallback, useState } from "react";

const useRerender = () => {
  const [, setRerender] = useState("");

  const rerender = useCallback(() => {
    setRerender(Date.now());
  }, []);

  return rerender;
};

export default useRerender;
