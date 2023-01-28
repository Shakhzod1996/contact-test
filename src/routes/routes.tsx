import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

export const routes: RouteProps[] = [
    {
        id: "contacts",
        element: <Home />,
        path: "/",
    },
    {
        id: "profile",
        element: <Profile />,
        path: "/profile",
    },
];
