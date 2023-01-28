
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../features/store";
import {
    PrivateContainer,
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN
} from "../style/global.style";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
const Layout = () => {
    const { value } = useSelector((state: RootState) => state.sideBarData);


    return (
        <div>
            <Header/>
            
            <Sidebar />
            {/* <Suspense fallback={<Loading />}> */}
                <motion.div
                    animate={{
                        width: "100%",
                        paddingLeft: value ? SIDEBAR_OPEN : SIDEBAR_CLOSE,
                    }}
                    className="home-container"
                >
                    <PrivateContainer>
                        <Outlet />
                    </PrivateContainer>
                </motion.div>
            {/* </Suspense> */}

            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
