import compose from "compose-function"
import {withReactQuery} from "./with-react-query";
import {withRouter} from "./with-router";
import {withManTine} from "./with-mantine";

export const withProviders = compose(withReactQuery, withRouter, withManTine)