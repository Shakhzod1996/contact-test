import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useGetUser from "../getUser/GetUser";

const PrivateRouter = () => {
    useEffect(() => {}, []);
    const token = localStorage.getItem("token");
    return token ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRouter;
