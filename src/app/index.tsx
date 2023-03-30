import React from 'react';
import {Button, Header} from "@mantine/core";
import {withProviders} from "./providers";
import Pages from "../pages";

const App = () => {
    return (
        <div>
            <Pages/>
        </div>
    );
};
export default withProviders(App);