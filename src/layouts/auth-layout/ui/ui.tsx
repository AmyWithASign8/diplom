import React from "react";
import { Header } from "../../../widgets/header";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
