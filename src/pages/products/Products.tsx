import { Button, Grid, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import Table from "../../components/elements/Table/Table";
import TextField from "../../components/form/TextField";
import { useApiMutation } from "../../hooks";
import { IProduct } from "./Product.types";
import { ProductsContainer } from "./Products.style";
// @ts-ignore
import BackDrop from "../../components/elements/backDrop/BackDrop";

interface IForm {
    image: string;
    title: string;
    description: string;
    _id?: string;
}

const Products = () => {
    const [editingProductId, setEditingProductId] = useState<string>();
    const [isBarOpen, setIsBarOpen] = useState<boolean>(false);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [uploadedImg, setUploadedImg] = useState<string>("");
    const [image, setImage] = useState<File>();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<IForm>();

    const {
        mutate: createMutate,
        data,
        isSuccess: isCreateSuccess,
    } = useApiMutation("product", "post");

    const {
        mutate: editMutate,
        data: EditData,
        isSuccess: IsSuccessfull,
    } = useApiMutation(`product/${editingProductId}`, "put");

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
            });
        }
    }, [image]);

    useEffect(() => {
        if (isCreateSuccess) {
            setIsBarOpen(false);
            toast.success("Created Product Successfully");
            clearFunction();
        }
    }, [isCreateSuccess]);

    useEffect(() => {
        if (IsSuccessfull) {
            setIsBarOpen(false);
            toast.success("Edited Product Successfully");
            clearFunction();
        }
    }, [IsSuccessfull]);

    const clearFunction = () => {
        setImage(undefined);
        setEditingProductId(undefined);
        setUploadedImg("");
        reset({
            image: "",
            title: "",
            description: "",
        });
    };

    // ? Submit Product
    const submitHandler = (data: IForm) => {
        return editingProductId
            ? editMutate({
                  image: uploadedImg || image,
                  title: data.title,
                  description: data.description,
              })
            : createMutate({
                  image: uploadedImg,
                  title: data.title,
                  description: data.description,
              });
    };

    // ? EditProduct
    const editClickHandler = (e: any, row: IProduct) => {
        e.stopPropagation();
        setEditingProductId(row._id);
        setIsBarOpen(true);
        setImage(undefined);
        setUploadedImg("");
        reset({
            title: row.title,
            image: row.image,
            description: row.description,
        });
        if (row.image) {
            setUploadedImg(row.image);
        }
    };

    const closeModalHandler = () => {
        setIsBarOpen(false);
        clearFunction();
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

    return (
        <ProductsContainer>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {isBarOpen && (
                    <BackDrop onClick={closeModalHandler} >
                        <motion.div
                            variants={dropIn}
                            animate="visible"
                            initial="hidden"
                            exit="exit"
                            key={"div"}
                            className="div-content"
                        >
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <header>
                                    <Button
                                        onClick={closeModalHandler}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Close
                                    </Button>
                                    <h2 style={{ color: "#fff" }}>
                                        {editingProductId ? "Edit" : "Add"}{" "}
                                        Product
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
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                control={control}
                                                dark={true}
                                                name="title"
                                                label="Title"
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
                                                name="description"
                                                label="Description"
                                                dark={true}
                                                variant="outlined"
                                                errors={errors}
                                                multiline
                                                type="text"
                                                rules={{
                                                    required: true,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                            >
                                                <label htmlFor="upload-file">
                                                    Upload Image
                                                </label>
                                            </Button>
                                            <input
                                                style={{ display: "none" }}
                                                type="file"
                                                id="upload-file"
                                                name="myImage"
                                                onChange={(event) =>
                                                    event?.target?.files?.[0]
                                                        ? setImage(
                                                              event?.target
                                                                  ?.files?.[0]
                                                          )
                                                        : null
                                                }
                                            />

                                            <div
                                                className="upload-container"
                                                style={{
                                                    width: "100px",
                                                    marginTop: "30px",
                                                    height: "100px",
                                                    borderRadius: "10px",
                                                    border: "2px solid #999",
                                                }}
                                            >
                                                {uploadedImg && (
                                                    <img
                                                        src={`${process.env.REACT_APP_BASE_URL}public/uploads/${uploadedImg} `}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            borderRadius:
                                                                "10px",
                                                        }}
                                                        alt="uploadedImg"
                                                    />
                                                )}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </main>
                            </form>
                        </motion.div>
                    </BackDrop>
                )}
            </AnimatePresence>

            <motion.div animate={{ width: "100%" }} className="product-in">
                <Table
                    columns={[
                        {
                            field: "image",
                            headerName: "Image",
                            resizable: true,
                            flex: 0.2,
                            renderCell: (
                                params: GridRenderCellParams<any, any, any>
                            ) => (
                                <div
                                    className="image-con"
                                    style={{
                                        borderRadius: "50%",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "Center",
                                    }}
                                >
                                    {" "}
                                    <img
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                        src={`${process.env.REACT_APP_BASE_URL}public/uploads/${params.row.image}`}
                                        alt={params.row.image}
                                    />{" "}
                                </div>
                            ),
                        },
                        {
                            field: "title",
                            headerName: "Title",
                            flex: 1,
                        },

                        {
                            field: "description",
                            headerName: "Description",
                            flex: 1.4,
                            renderCell: (
                                params: GridRenderCellParams<any, any, any>
                            ) => (
                                <Tooltip
                                    title={params.row.description}
                                    placement="bottom-start"
                                >
                                    <span>{params.row.description}</span>
                                </Tooltip>
                            ),
                        },

                        {
                            field: "actions",
                            headerName: "Actions",
                            resizable: true,
                            flex: 0.5,
                            renderCell: (
                                params: GridRenderCellParams<any, any, any>
                            ) => (
                                <Button
                                    onClick={(e) =>
                                        editClickHandler(e, params.row)
                                    }
                                >
                                    <BiEditAlt style={{ fontSize: "20px" }} />
                                </Button>
                            ),
                        },
                    ]}
                    dataUrl="product"
                    addable={true}
                    setIsBarOpen={setIsBarOpen}
                    searchable={true}
                    isAddedSuccess={isCreateSuccess}
                    IsSuccessfull={IsSuccessfull}
                />
            </motion.div>
        </ProductsContainer>
    );
};

export default Products;
