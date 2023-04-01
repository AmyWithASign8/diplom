import React from "react";
import { withProviders } from "./providers";
import Pages from "../pages";
import "./index.pcss";

const App = () => {
  return (
    <div>
      <Pages />
    </div>
  );
};
export default withProviders(App);
