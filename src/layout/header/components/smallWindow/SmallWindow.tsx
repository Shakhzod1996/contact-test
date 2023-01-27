import { Menu, MenuItem } from "@mui/material";
import React from "react";

interface IProps {
    anchorEl: any;
    open: boolean;
    handleClose: () => void;
    profileClickHandler: () => void;
    logOutHandler: () => void
}

const SmallWindow: React.FC<IProps> = ({
    anchorEl,
    open,
    handleClose,
    profileClickHandler,
    logOutHandler
}) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <MenuItem onClick={profileClickHandler}>Profile</MenuItem>
            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Menu>
    );
};

export default SmallWindow;
