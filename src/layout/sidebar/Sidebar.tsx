import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Chip, Tooltip } from "@mui/material";

import { RootState } from "../../features/store";
import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../../style/global.style";
import { routes } from "./routes/routes";
import { SidebarContainer } from "./Sidebar.style";
import { openSideBarFunc } from "./SidebarSlice";
import { useApiMutation } from "../../hooks";
import {useEffect} from 'react'

const Sidebar = () => {

    const {pathname} = useLocation()
    const { value } = useSelector((state: RootState) => state.sideBarData);
    const dispatch = useDispatch();



    

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <SidebarContainer value={value}>
            <motion.div
                animate={{ width: value ? SIDEBAR_OPEN : SIDEBAR_CLOSE }}
                className="sidebar"
            >
                <div className="top-section">
                    {value && (
                        <motion.h3
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            Contact
                        </motion.h3>
                    )}
                    <button
                        style={{
                            cursor: "pointer",
                            transform: value
                                ? "rotate(-180deg)"
                                : "rotate(0deg)",
                            transition: "all .2s ease",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "#44545b",
                        }}
                        onClick={() => dispatch(openSideBarFunc())}
                    >
                        <AiOutlineArrowRight />
                    </button>
                </div>
                <section className="routes">
                    {routes.map((item) => {
                        return (
                            <Tooltip
                            key={item.name}
                                placement="left"
                                title={value ? null : item.name}
                            >
                                <NavLink
                                    className="sidebar-link"
                                    style={({ isActive }) =>
                                        isActive
                                            ? {
                                                  borderRight: "4px solid #fff",
                                                  backgroundColor:
                                                      "#44545b",
                                              }
                                            : undefined
                                    }
                                    to={item.path}
                                    key={item.name}
                                >
                                    <div className="icon">{item.icon}</div>
                                    <AnimatePresence>
                                        {value && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link-text"
                                            >
                                                
                                                {item.name}
                                              
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            </Tooltip>
                        );
                    })}
                </section>
            </motion.div>
        </SidebarContainer>
    );
};

export default Sidebar;
