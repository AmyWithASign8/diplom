import compose from "compose-function";
import { withReactQuery } from "./with-react-query";
import { withRouter } from "./with-router";
import {withResizeObserver} from "./with-resize-observer";
export const withProviders = compose(withReactQuery, withRouter, withResizeObserver);
