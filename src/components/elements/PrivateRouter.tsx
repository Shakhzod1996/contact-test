import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import GetUser from "../../layout/getUser/GetUser";

const PrivateRouter = () => {
    useEffect(() => {}, []);
    const token = localStorage.getItem("token");
    return token ? (
        <>
        <GetUser  />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRouter;
