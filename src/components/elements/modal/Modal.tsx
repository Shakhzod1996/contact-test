import React, { useState } from "react";
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
import { BiCameraHome } from "react-icons/bi";
// @ts-ignore
import def from "../../../assets/images/user.jpg";
import { BiCamera } from "react-icons/bi";

interface IModalProps {
    isBarOpen: boolean;
    editUrl?: string;
    postUrl?: string;
}

const Modal: React.FC<IModalProps> = ({ isBarOpen, editUrl, postUrl }) => {
    const [age, setAge] = React.useState("");

    const [image, setImage] = useState<File>();
    const [uploadedImg, setUploadedImg] = useState<string>("");
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
                                        <Grid item xs={4}>
                                            <div className="image-father">
                                                <div className="image-container">
                                                    <label
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                            width: "40px",
                                                            height: "40px",
                                                            bottom: "5px",
                                                            right: "5px",
                                                            background:
                                                                "#3f4f56",
                                                            borderRadius: "50%",
                                                            cursor: "pointer",
                                                            boxShadow:
                                                                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                                                        }}
                                                        htmlFor="upload-file"
                                                    >
                                                        <BiCamera
                                                            fontSize={20}
                                                        />
                                                    </label>
                                                    <input
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        type="file"
                                                        id="upload-file"
                                                        name="myImage"
                                                        onChange={(event) =>
                                                            event?.target
                                                                ?.files?.[0]
                                                                ? setImage(
                                                                      event
                                                                          ?.target
                                                                          ?.files?.[0]
                                                                  )
                                                                : null
                                                        }
                                                    />
                                                    <img
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                        src={def}
                                                        alt="img"
                                                    />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8}>
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
                                        </Grid>
                                    </Grid>

                                    <div>
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

                                        <TextField
                                            fullWidth
                                            control={control}
                                            name="email"
                                            label="Email"
                                            dark={false}
                                            variant="outlined"
                                            errors={errors}
                                            type="number"
                                            rules={{
                                                required: true,
                                            }}
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel
                                                sx={{ color: "#fff" }}
                                                id="demo-simple-select-label"
                                            >
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
                                    </div>
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
