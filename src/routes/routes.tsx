import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import Home from "../pages/home/Home";
import Others from "../pages/others/Others";
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

    {
        id: "others",
        element: <Others />,
        path: "/others",
    },
];
