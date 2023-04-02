import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/main-layout";
import { AuthLayout } from "../layouts/auth-layout";
const LandingPage = lazy(() => import("./landing-page"));
const AboutPage = lazy(() => import("./about-page"));
const CartPage = lazy(() => import("./cart-page"));
const ProductPage = lazy(() => import("./product-page"));
const RegistrationPage = lazy(() => import("./reg-page"));
const AuthPage = lazy(() => import("./auth-page"));

const Pages = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path={"about-us"} element={<AboutPage />} />
        <Route path={"cart"} element={<CartPage />} />
        <Route path={"catalog"} element={<ProductPage />} />
      </Route>
      <Route path={"/user"} element={<AuthLayout />}>
        <Route path={"auth"} element={<AuthPage />} />
        <Route path={"reg"} element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
};

export default Pages;
