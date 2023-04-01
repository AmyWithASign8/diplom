import compose from "compose-function";
import { withReactQuery } from "./with-react-query";
import { withRouter } from "./with-router";
export const withProviders = compose(withReactQuery, withRouter);
