import React from 'react';
import {Header} from "../../../widgets/header";
import {Footer} from "../../../widgets/footer";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};
