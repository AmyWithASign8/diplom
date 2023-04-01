import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./landing-page";
import { MainLayout } from "../layouts/main-layout";
import { AboutUs } from "./about-page";
import { CartPage } from "./cart-page";
import { ProductPage } from "./product-page";

const Pages = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path={"about-us"} element={<AboutUs />} />
        <Route path={"cart"} element={<CartPage />} />
        <Route path={"catalog"} element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default Pages;
