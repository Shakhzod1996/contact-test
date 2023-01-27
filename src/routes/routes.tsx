import { lazy } from "react";
import { RouteProps } from "react-router-dom";
const Home = lazy(() => import("../pages/home/Home"));
const Tasks = lazy(() => import("../pages/tasks/Tasks"));
const Admins = lazy(() => import("../pages/admins/Admins"));
const Applications = lazy(() => import("../pages/applications/Applications"));
const Products = lazy(() => import("../pages/products/Products"));
const Plans = lazy(() => import("../pages/plans/Plans"));
const Profile = lazy(() => import("../pages/profile/Profile") ) ;

export const routes: RouteProps[] = [
    {
        id: "contacts",
        element: <Home />,
        path: "/",
    },
   
];
