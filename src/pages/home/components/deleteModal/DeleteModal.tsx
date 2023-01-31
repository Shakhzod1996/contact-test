import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackDrop from "../../../../components/elements/backDrop/BackDrop";
import { RootState } from "../../../../features/store";
import { useApiMutation } from "../../../../hooks";
import { DeleteModalContainer } from "./Delete.tyle";
interface IPropsMOdal {
    isModalOpen: boolean;
    setIsMOdalOpen: Dispatch<SetStateAction<boolean>>;
    refetch: () => void
    fetchRelation: () => void
}
const DeleteModal: React.FC<IPropsMOdal> = ({
    isModalOpen,
    setIsMOdalOpen,
    refetch,
    fetchRelation
}) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state: RootState) => state.contacts);

    const { data, isSuccess, mutate } = useApiMutation("/contact", "delete");
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

    useEffect(() => {
        if (isSuccess) {
            toast.success("deleted successfully");
            setIsMOdalOpen(false);
            refetch()
            fetchRelation()
        }
    }, [isSuccess]);

    const clickModal = (e: any) => {
        e.stopPropagation();
    };

    const DeleteHandler = () => {
        mutate({
            _ids: [_id],
        });
    };
    return (
        <DeleteModalContainer>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {isModalOpen && (
                    <BackDrop onClick={() => setIsMOdalOpen(false)}>
                        <motion.div
                            variants={dropIn}
                            animate="visible"
                            initial="hidden"
                            exit="exit"
                            onClick={clickModal}
                            key={"div"}
                            className="delete-content"
                        >
                            <h2>Delete Contact</h2>
                            <p>
                                Would You like to delete this contact
                                permenantly ?
                            </p>

                            <div className="btns-container">
                                <Button onClick={() => setIsMOdalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={DeleteHandler}
                                    variant="outlined"
                                    color="error"
                                >
                                    Delete
                                </Button>
                            </div>

                            <div></div>
                        </motion.div>
                    </BackDrop>
                )}
            </AnimatePresence>
        </DeleteModalContainer>
    );
};

export default DeleteModal;
