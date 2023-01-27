import React from "react";
import { useLocation } from "react-router-dom";

const HeaderTitle = () => {
    const { pathname } = useLocation();
    return <h2>Contact app</h2>;
};

export default HeaderTitle;
