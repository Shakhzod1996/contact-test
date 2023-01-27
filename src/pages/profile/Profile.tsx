import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { ProfileContainer } from "./Profile.style";
import { BsThreeDots } from "react-icons/bs";
// @ts-ignore
import def from "./assets/default-user.png";
import { useApiMutation } from "../../hooks";
import TextField from "../../components/form/TextField";
import { useForm } from "react-hook-form";
import { BiCamera } from "react-icons/bi";
import axios from "axios";
import useGetUser from "../../components/getUser/GetUser";
import { getUserFunc } from "../../components/getUser/GetUserSlice";
import { toast } from "react-toastify";
import ReactCodeInput from "react-code-input";
const Profile = () => {
    const { refetch } = useGetUser();
    const dispatch = useDispatch();
    const { data: userProfile } = useSelector((state: RootState) => state.user);
    interface IForm {
        firstName?: string;
        lastName?: string;
        imgUrl?: string;
        phoneNumber?: string;
        password?: string;
    }
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IForm>();
    const {
        mutate: putMutate,
        data: putdataImage,
        isSuccess: successPut,
    } = useApiMutation("admin", "put");

    const {
        mutate,
        data: backdata,
        isSuccess,
    } = useApiMutation("admin/sendOtp", "post");

    const {
        mutate: passwordMutate,
        data: passwordData,
        isSuccess: passwordSuccess,
    } = useApiMutation("admin/password", "put");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [image, setImage] = useState<File>();
    const [uploadedImg, setUploadedImg] = useState<string>("");

    // ? Modal
    const [opened, setOpened] = React.useState(false);
    const [privacyOpen, setPrivacyOpen] = React.useState(false);
    const [inputVal, setInputVal] = useState<any>();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandler = () => {
        setAnchorEl(null);
        localStorage.clear();
        window.location.reload();
    };

    const EditHandler = () => {
        setAnchorEl(null);
        reset({
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
        });
        setOpened(true);
    };

    useEffect(() => {
        if (successPut) {
            setOpened(false);
            toast.success("Information changed successfully");
        }
    }, [successPut]);

    const privacyClickHandler = () => {
        setAnchorEl(null);
        reset({
            phoneNumber: userProfile?.phoneNumber,
        });
        setPrivacyOpen(true);
        mutate({});
    };

    const privacyHandleClosed = () => {
        setPrivacyOpen(false);
    };

    // ? Image set
    useEffect(() => {
        if (image) {
            axios({
                url: `${process.env.REACT_APP_BASE_URL}upload`,
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
                putMutate({
                    imgUrl: res.data.data,
                });

                dispatch(
                    getUserFunc({ ...userProfile, imgUrl: res.data.data })
                );
            });
        }
    }, [image]);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 450,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleClosed = () => setOpened(false);

    // ? Submit  Info
    const submitInfoHandler = (data: IForm) => {
        putMutate({
            firstName: data.firstName,
            lastName: data?.lastName,
        });

        dispatch(
            getUserFunc({
                ...userProfile,
                // @ts-ignore
                firstName: data.firstName,
                // @ts-ignore
                lastName: data?.lastName,
            })
        );
    };

    const changedHandler = (e: any) => {
        setInputVal(e);
    };

    const submitPrivacy = (data: IForm) => {
        passwordMutate({
            password: data?.password,
            phoneNumber: data?.phoneNumber,
            otp: inputVal,
        });

        dispatch(
            getUserFunc({
                ...userProfile,
                // @ts-ignore
                phoneNumber: data?.phoneNumber,
            })
        );
    };

    const props = {
        className: "reactCodeInput",
        inputStyle: {
            fontFamily: "monospace",
            margin: "4px",
            mozAppearance: "textfield",
            width: "50px",
            borderRadius: "3px",
            fontSize: "24px",
            height: "40px",
            paddingLeft: "7px",
            border: "1px solid #e3e3e3",
            color: "#000",
        },
        inputStyleInvalid: {
            fontFamily: "monospace",
            margin: "4px",
            mozAppearance: "textfield",
            width: "15px",
            borderRadius: "3px",
            fontSize: "14px",
            height: "26px",
            paddingLeft: "7px",
            backgroundColor: "black",
            color: "red",
            border: "1px solid red",
            display: "flex",
            justifyContent: "center",
        },
    };

    useEffect(() => {
        if (passwordSuccess) {
            toast.success("Privacy successfully changed");
            setPrivacyOpen(false);
            localStorage.clear();
            localStorage.setItem("token", passwordData?.data?.token);
        }
    }, [passwordSuccess]);

    return (
        <>
            <ProfileContainer>
                <div className="profile-main">
                    <div className="profile-top"></div>

                    <div className="profile-container">
                        <div className="just-flex">
                            <div className="image-container">
                                <label
                                    style={{
                                        position: "absolute",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "40px",
                                        height: "40px",
                                        bottom: "10px",
                                        right: "10px",
                                        background: "#fff",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        boxShadow:
                                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                                    }}
                                    htmlFor="upload-file"
                                >
                                    <BiCamera fontSize={20} />
                                </label>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="upload-file"
                                    name="myImage"
                                    onChange={(event) =>
                                        event?.target?.files?.[0]
                                            ? setImage(
                                                  event?.target?.files?.[0]
                                              )
                                            : null
                                    }
                                />
                                <img 
                                style={{objectFit: "cover"}}
                                    src={`${process.env.REACT_APP_BASE_URL}public/uploads/${
                                        uploadedImg ||
                                        userProfile?.imgUrl ||
                                        def
                                    }`}
                                    alt="img"
                                />
                            </div>

                            <div>
                                <h2>
                                    {userProfile?.firstName}{" "}
                                    {userProfile.lastName}
                                </h2>
                                <h3>{userProfile?.phoneNumber}</h3>
                            </div>
                        </div>

                        <Button
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            // @ts-ignore
                            onClick={handleClick}
                            className="avatar-circle"
                        >
                            <BsThreeDots style={{ fontSize: "20px" }} />
                        </Button>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={EditHandler}>Edit Info</MenuItem>
                            <MenuItem onClick={privacyClickHandler}>
                                Edit Privacy
                            </MenuItem>

                            <MenuItem color="warning" onClick={logOutHandler}>Logout</MenuItem>
                        </Menu>
                        <Modal
                            sx={{ border: "none" }}
                            open={opened}
                            onClose={handleClosed}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <form
                                    onSubmit={handleSubmit(submitInfoHandler)}
                                >
                                    <TextField
                                        control={control}
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        dark={true}
                                        type="text"
                                        rules={{
                                            required: true,
                                        }}
                                        errors={errors}
                                        name="firstName"
                                    />

                                    <TextField
                                        control={control}
                                        label="Last Name"
                                        variant="outlined"
                                        dark={true}
                                        fullWidth
                                        type="text"
                                        rules={{
                                            required: true,
                                        }}
                                        errors={errors}
                                        name="lastName"
                                    />

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Button
                                            onClick={handleClosed}
                                            color="secondary"
                                            variant="outlined"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant="outlined"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </Box>
                        </Modal>

                        <Modal
                            sx={{ border: "none" }}
                            open={privacyOpen}
                            onClose={privacyHandleClosed}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <form onSubmit={handleSubmit(submitPrivacy)}>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: "20px",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <h3 style={{ marginBottom: "10px" }}>
                                            Enter your OTP
                                        </h3>
                                        {/* @ts-ignore */}
                                        <ReactCodeInput
                                            {...props}
                                            type="number"
                                            fields={6}
                                            onChange={(e) => changedHandler(e)}
                                        />
                                    </div>

                                    <TextField
                                        control={control}
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        dark={true}
                                        type="text"
                                        rules={{
                                            required: true,
                                        }}
                                        errors={errors}
                                        name="password"
                                    />

                                    <TextField
                                        control={control}
                                        label="Phone Number"
                                        variant="outlined"
                                        fullWidth
                                        dark={true}
                                        type="text"
                                        rules={{
                                            required: true,
                                        }}
                                        errors={errors}
                                        name="phoneNumber"
                                    />

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Button
                                            onClick={privacyHandleClosed}
                                            color="secondary"
                                            variant="outlined"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant="outlined"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </ProfileContainer>
        </>
    );
};

export default Profile;
