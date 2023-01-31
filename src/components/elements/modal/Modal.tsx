import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusFunc } from "../../../layout/header/components/HeaderSlice";
import TextFieldCustomer from "../../form/TextField";
import BackDrop from "../backDrop/BackDrop";
import { ModalContainer } from "./Modal.style";
// @ts-ignore
import { BiCamera } from "react-icons/bi";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
// @ts-ignore
import def from "../../../assets/images/user.jpg";
import { RootState } from "../../../features/store";
import { useApiMutation } from "../../../hooks";
import { editChangeStatus } from "../../../pages/home/ContactsSlice";
import { IContactForm } from "../../../pages/home/types/Contact.types";
import { IRelation } from "./types/Relation.types";

interface IModalProps {
    isBarOpen: boolean;
    editUrl?: string;
    postUrl: string;
    setEditId: Dispatch<React.SetStateAction<string | undefined>>;
    editId: string | undefined;
    refetch: () => void;
    relationShipData: AxiosResponse<IRelation[], any> | undefined;
    fetchRelation: () => void
}

const Modal: React.FC<IModalProps> = ({
    isBarOpen,
    editUrl,
    postUrl,
    setEditId,
    editId,
    refetch,
    relationShipData,
    fetchRelation,
}) => {

    // ! redux
    const { _id } = useSelector((state: RootState) => state.loginInfo);
    const { selectedItems, editStatus } = useSelector(
        (state: RootState) => state.contacts
    );

    // ! Hooks
    const [selectId, setSelectId] = useState("");
    const [formValues, setFormValues] = useState<any>("");
    const [editIdLocal, setEditIdlocal] = useState<string>(selectedItems._id);
    const dispatch = useDispatch();
    const [image, setImage] = useState<File>();
    const [uploadedImg, setUploadedImg] = useState<string>("");
    const [relationshipValue, setRelationshipValue] = useState("");

    // !Fetch Data
    const {
        isSuccess: postSuccess,
        mutate: postMutate,
    } = useApiMutation(postUrl, "post");

    const {
        data: putData,
        isSuccess: putSuccess,
        mutate: putMutate,
    } = useApiMutation(editUrl + "/" + editIdLocal, "put");

    useEffect(() => {
        if (editStatus) {
            reset({
                email: selectedItems.email,
                firstName: selectedItems.firstName,
                lastName: selectedItems.lastName,
                image: selectedItems.image,
                phoneNumber: selectedItems.phoneNumber,
            });
            setEditIdlocal(selectedItems._id);
        }
    }, [editStatus]);

    // ! Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        getValues,
    } = useForm<IContactForm>();

    // !LifeCircle

    useEffect(() => {
        if (postSuccess) {
            toast.success("Contact created Successfully");
            dispatch(changeStatusFunc());

            refetch();
            ClearFunction();
            fetchRelation()
        }
    }, [postSuccess]);

    useEffect(() => {
        if (putSuccess) {
            toast.success("Contact updated Successfully");
            dispatch(changeStatusFunc());
            refetch();
            ClearFunction();
            dispatch(editChangeStatus());
            fetchRelation()
        }
    }, [putSuccess]);

        // @ts-ignore
        const SortedArr = [...relationShipData?.data, { name: "empty", _id: "" }];

    // ? Animation
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

    // ! Functions
    // ? Clear Function
    const ClearFunction = () => {
        reset({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",

        });
        setRelationshipValue("")
        setEditIdlocal("");
        setEditId(undefined);
        setSelectId("");
        setUploadedImg("");
        setImage(undefined);
    };

    // ? CLose modal
    const closeModalHandler = () => {
        dispatch(editChangeStatus());
        dispatch(changeStatusFunc());
        ClearFunction();
    };
    // ? Open Modal
    const clickModal = (e: any) => {
        e.stopPropagation();
    };

    // ? Select Change
    const handleChange = (event: SelectChangeEvent) => {
        setSelectId(event.target.value);
    };

    // ?Adding Image
    useEffect(() => {
        if (image) {
            axios({
                url: `${process.env.REACT_APP_BASE_URL}/upload`,
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {
                    file: image,
                    type: "img",
                },
            }).then((res) => {
                setUploadedImg(res.data.data);
            });
        }
    }, [image]);

    // ? Submit Function
    const submitHandler = (data: IContactForm) => {
        if (editId) {
            putMutate({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                userId: _id,
                relationshipId: selectId,
                image: uploadedImg || image,
                relationshipName: relationshipValue
            });
        } else {
            postMutate({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                userId: _id,
                relationshipId: selectId,
                image: uploadedImg || image,
                relationshipName: relationshipValue

            });
        }

        setFormValues(getValues());
    };

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
                                        {editId
                                            ? "Edit Contact"
                                            : "Add Contact"}
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
                                                        src={
                                                            
                                                            uploadedImg
                                                                ? ` ${process.env.REACT_APP_BASE_URL}/public/uploads/${uploadedImg} `
                                                                : editId &&
                                                                  selectedItems.image
                                                                ? ` ${process.env.REACT_APP_BASE_URL}/public/uploads/${selectedItems.image} `
                                                                : def
                                                        }
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                        alt="uploadedImg"
                                                    />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextFieldCustomer
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

                                            <TextFieldCustomer
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
                                        <TextFieldCustomer
                                            fullWidth
                                            control={control}
                                            name="phoneNumber"
                                            label="Phone Number"
                                            dark={false}
                                            variant="outlined"
                                            errors={errors}
                                            type="text"
                                            rules={{
                                                required: true,
                                            }}
                                        />

                                        <TextFieldCustomer
                                            fullWidth
                                            control={control}
                                            name="email"
                                            label="Email"
                                            dark={false}
                                            variant="outlined"
                                            errors={errors}
                                            required
                                            type="email"
                                            rules={{
                                                required: true,
                                            }}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "15px",
                                                alignItems: "center",
                                            }}
                                        >
                                            {SortedArr &&
                                                SortedArr.length >
                                                    1 ? (
                                                    <FormControl
                                                    disabled={relationshipValue.length > 0}
                                                        style={{
                                                            width: `${
                                                                editId
                                                                    ? "100%"
                                                                    : "60%"
                                                            }`,
                                                        }}
                                                    >
                                                        <InputLabel
                                                            sx={{
                                                                color: "#fff",
                                                            }}
                                                            id="demo-simple-select-label"
                                                        >
                                                            Relationship
                                                        </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectId}
                                                            label="Age"
                                                            onChange={
                                                                handleChange
                                                            }
                                                        >
                                                            {SortedArr.map(
                                                                (item) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={
                                                                                item._id
                                                                            }
                                                                            value={
                                                                                item._id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </MenuItem>
                                                                    );
                                                                }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                ): null}

                                            {
                                            (relationShipData?.data &&
                                                relationShipData?.data.length <=
                                                    0) ? null : (
                                                <p>or</p>
                                            )}

                                            
                                                <TextField
                                                disabled={selectId ? true : false}
                                                    style={{
                                                        width: `${
                                                            relationShipData?.data &&
                                                            relationShipData
                                                                ?.data.length <=
                                                                0
                                                                ? "100%"
                                                                : "40%"
                                                        }`,
                                                    }}
                                                    name="relative"
                                                    value={relationshipValue}
                                                    
                                                    onChange={(e)=>setRelationshipValue(e.target.value)}
                                                    label="Enter relationship"
                                                    variant="outlined"
                                                    type="text"
                                                />
                                         
                                        </div>
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
