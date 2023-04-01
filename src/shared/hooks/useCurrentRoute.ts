import { useLocation } from "react-router-dom";
import React from "react";

function useCurrentRoute() {
  let getCurrentRoute;
  React.useEffect(() => {
    getCurrentRoute = useLocation();
  }, []);

  return getCurrentRoute;
}
export default useCurrentRoute;
