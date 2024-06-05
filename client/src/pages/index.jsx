import { lazy } from "react";

import { SuspenseFallbackPage } from "./SuspenseFallbackPage/SuspenseFallbackPage";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const AdminDashboardPage = lazy(() => import("./AdminDashboardPage/AdminDashboardPage"));
const HomePage = lazy(() => import("./HomePage/HomePage"));
const LoginPage = lazy(() => import("./LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./RegisterPage/RegisterPage"));
const TourPage = lazy(() => import("./TourPage/TourPage"));
const UnknownRoutePage = lazy (() => import("./UnknownRoutePage/UnknownRoutePage"));
const UserDashboardPage = lazy(() => import("./UserDashboardPage/UserDashboardPage"));

export {
    AdminDashboardPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TourPage,
    UnknownRoutePage,
    UserDashboardPage,
    ErrorBoundary,
    SuspenseFallbackPage
};