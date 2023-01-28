import { AnimatePresence,motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { DeleteModalContainer } from "./Delete.tyle";
import BackDrop from "../../../../components/elements/backDrop/BackDrop";
import { Button } from "@mui/material";
interface IPropsMOdal {
    isModalOpen: boolean;
    setIsMOdalOpen: Dispatch<SetStateAction<boolean>>
}
const DeleteModal: React.FC<IPropsMOdal> = ({ isModalOpen ,setIsMOdalOpen }) => {

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "-100vh",
            opacity: 0,
        },
    };
    const clickModal = (e: any) => {
        e.stopPropagation();
    };
    return (
        <DeleteModalContainer>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {isModalOpen && <BackDrop onClick={() => setIsMOdalOpen(false)}>
                    <motion.div variants={dropIn}
                            animate="visible"
                            initial="hidden"
                            exit="exit"
                            onClick={clickModal}
                            key={"div"} className="delete-content">
                        <h2>Delete Contact</h2>
                        <p>Would You like to delete this contact permenantly ?</p>

                        <div className="btns-container">
                            <Button onClick={() => setIsMOdalOpen(false)}>Cancel</Button>
                            <Button variant="outlined" color="error">Delete</Button>

                        </div>

                        <div>

                        </div>
                    </motion.div>
                    </BackDrop>}
            </AnimatePresence>
        </DeleteModalContainer>
    );
};

export default DeleteModal;
