import React, { FC } from "react";
import { motion } from "framer-motion";
interface IProps {
    children: any;
    onClick: any;
}

const BackDrop: FC<IProps> = ({ children, onClick }) => {
    return (
        <motion.div
            style={{
                zIndex: 554,
                width: "100%",
                height: "100vh",
                backgroundColor: " rgba(0, 0, 0, 0.3)",
                position: "fixed",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-back"
        >
            {children}
        </motion.div>
    );
};

export default BackDrop;
