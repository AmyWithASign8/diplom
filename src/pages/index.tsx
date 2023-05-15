import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/main-layout";
import { AuthLayout } from "../layouts/auth-layout";
import { AdminPanelLayout } from "../layouts/admin-panel-layout";
import { check } from "../shared/api/queries";

const AdminPanelAddProductPage = lazy(() => import("./admin/add-product"));
const AdminPanelMainPage = lazy(() => import("./admin/admin-panel-main"));
const ViewerPage = lazy(() => import("./viewer-page"));
const ReviewsPage = lazy(() => import("./reviews-page"));
const LandingPage = lazy(() => import("./landing-page"));
const AboutPage = lazy(() => import("./about-page"));
const CartPage = lazy(() => import("./cart-page"));
const ProductPage = lazy(() => import("./product-page"));
const RegistrationPage = lazy(() => import("./reg-page"));
const AuthPage = lazy(() => import("./auth-page"));

const Pages = () => {
  React.useEffect(() => {
    check();
  }, []);
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path={"about-us"} element={<AboutPage />} />
        <Route path={"user/my-cart"} element={<CartPage />} />
        <Route path={"catalog"} element={<ProductPage />} />
        <Route path={"user/my-profile"} element={<ViewerPage />} />
        <Route path={"reviews"} element={<ReviewsPage />} />
      </Route>
      <Route path={"/user"} element={<AuthLayout />}>
        <Route path={"auth"} element={<AuthPage />} />
        <Route path={"reg"} element={<RegistrationPage />} />
      </Route>
      <Route path={"/admin-panel"} element={<AdminPanelLayout />}>
        <Route index element={<AdminPanelMainPage />} />
        <Route path={"add-product"} element={<AdminPanelAddProductPage />} />
      </Route>
    </Routes>
  );
};

export default Pages;
