import { usePageTitleContext } from "context/PageTitleContextProvider";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = (title, trigger) => {
  const { setPageTitle, pageTitle } = usePageTitleContext();
  const [lastLocation, setLastLocation] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      setLastLocation("");
      setPageTitle("");
    }
  }, [location.pathname, lastLocation, setLastLocation, setPageTitle]);

  useEffect(() => {
    setPageTitle(title);
  }, [title, trigger, setPageTitle]);

  return {
    pageTitle,
    setPageTitle: (title) => {
      setPageTitle(title);
      setLastLocation(location.pathname);
    },
  };
};

export default usePageTitle;
