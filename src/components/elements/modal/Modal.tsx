import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackDrop from "../backDrop/BackDrop";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import TextField from "../../form/TextField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changeStatusFunc } from "../../../layout/header/components/HeaderSlice";
import { ModalContainer } from "./Modal.style";

interface IModalProps {
    isBarOpen: boolean;
    editUrl?: string;
    postUrl?: string;
}

const Modal: React.FC<IModalProps> = ({ isBarOpen, editUrl, postUrl }) => {
    const [age, setAge] = React.useState("");
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<any>();

    // ? CLose modal
    const closeModalHandler = () => {
        dispatch(changeStatusFunc());
    };

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

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const submitHandler = () => {};
    return (
        <ModalContainer>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {isBarOpen && (
                    <BackDrop onClick={() => closeModalHandler()}>
                        <motion.div
                            variants={dropIn}
                            animate="visible"
                            initial="hidden"
                            exit="exit"
                            key={"div"}
                            className="div-content"
                            onClick={clickModal}
                        >
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <header>
                                    <Button
                                        onClick={() => closeModalHandler()}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Close
                                    </Button>
                                    <h2 style={{ color: "#fff" }}>
                                        Add Contact
                                    </h2>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </header>

                                <main>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                control={control}
                                                dark={false}
                                                name="firstName"
                                                label="First Name"
                                                variant="outlined"
                                                type="text"
                                                errors={errors}
                                                rules={{
                                                    required: true,
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                control={control}
                                                name="lastName"
                                                label="Last Name"
                                                dark={false}
                                                variant="outlined"
                                                errors={errors}
                                                type="text"
                                                rules={{
                                                    required: true,
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                control={control}
                                                name="phoneNumber"
                                                label="Phone Number"
                                                dark={false}
                                                variant="outlined"
                                                errors={errors}
                                                type="number"
                                                rules={{
                                                    required: true,
                                                }}
                                            />

                                            <FormControl fullWidth>
                                                <InputLabel sx={{color: "#fff"}} id="demo-simple-select-label">
                                                    Status
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={age}
                                                    label="Age"
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>
                                                        Ten
                                                    </MenuItem>
                                                    <MenuItem value={20}>
                                                        Twenty
                                                    </MenuItem>
                                                    <MenuItem value={30}>
                                                        Thirty
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </main>
                            </form>
                        </motion.div>
                    </BackDrop>
                )}
            </AnimatePresence>
        </ModalContainer>
    );
};

export default Modal;
