import { Button, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../features/store";
import {
    HEADER_CLOSE,
    HEADER_OPEN,
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN,
} from "../../style/global.style";
import { HeaderContainer } from "./Header.style";
// @ts-ignore
import def from "./assets/default-user.png";
import HeaderTitle from "./components/headerTitle/HeaderTitle";
import SmallWindow from "./components/smallWindow/SmallWindow";
import { AiOutlinePlus } from "react-icons/ai";
import { changeStatusFunc } from "./components/HeaderSlice";
const Header = () => {
    // ? Hooks
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [yOffset, setYOffset] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);

    // ? Fetching Data
    const { data: userProfile } = useSelector((state: RootState) => state.user);

    // ?Redux
    const { value } = useSelector((state: RootState) => state.sideBarData);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const profileClickHandler = () => {
        setAnchorEl(null);
        navigate("/profile");
    };

    const logOutHandler = () => {
        setAnchorEl(null);
        localStorage.clear();
        window.location.reload();
    };

 

    // ? Hide and Show on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function handleScroll() {
        const currentYOffset = window.pageYOffset;
        const visible = yOffset > currentYOffset;

        setYOffset(currentYOffset);
        setVisible(visible);
    }

    return (
        <HeaderContainer visible={visible}>
            <motion.div
                animate={{ left: value ? HEADER_OPEN : HEADER_CLOSE }}
                className="header-container"
            >
                <div className="header-in">
                    <HeaderTitle />
                    <div className="header-container-flex">
                        <Button onClick={() => dispatch(changeStatusFunc())} variant="contained">
                            <AiOutlinePlus />
                            Add
                        </Button>
                        <Tooltip placement="left" title="Profile">
                            <div
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                // @ts-ignore
                                onClick={handleClick}
                                className="avatar-circle"
                            >
                                <img
                                    style={{ objectFit: "cover" }}
                                    src={
                                        userProfile?.imgUrl
                                            ? `${process.env.REACT_APP_BASE_URL}public/uploads/${userProfile?.imgUrl}`
                                            : def
                                    }
                                    alt="img"
                                />
                            </div>
                        </Tooltip>
                    </div>

                    <SmallWindow
                        anchorEl={anchorEl}
                        profileClickHandler={profileClickHandler}
                        open={open}
                        handleClose={handleClose}
                        logOutHandler={logOutHandler}
                    />
                </div>
            </motion.div>
        </HeaderContainer>
    );
};

export default Header;