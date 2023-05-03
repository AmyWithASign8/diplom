import React from 'react';
import {AdminPanelHeader} from "../../../widgets/admin-panel-header";
import {Outlet} from "react-router-dom";

export const AdminPanelLayout = () => {
    return (
        <div>
            <AdminPanelHeader/>
            <Outlet/>
        </div>
    );
};
