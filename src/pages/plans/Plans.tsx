import { Button, Grid, Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import BackDrop from "../../components/elements/backDrop/BackDrop";
import Table from "../../components/elements/Table/Table";
import TextField from "../../components/form/TextField";
import { useApiMutation } from "../../hooks";
import { PlansContainer } from "./Plans.style";
import { IPlan } from "./Plans.type";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
interface IForm {
    price: string;
    title: string;
    description: string;
}
const Plans = () => {
    const [editingPlanId, setEditingPlanId] = useState<string>();
    const [isBarOpen, setIsBarOpen] = useState<boolean>(false);
    const [personName, setPersonName] = React.useState<string[]>([]);

    const {
        mutate: createMutate,
        data,
        isSuccess: isCreateSuccess,
    } = useApiMutation("price", "post");
    const {
        mutate: editMutate,
        data: EditData,
        isSuccess: IsSuccessfull,
    } = useApiMutation(`price/${editingPlanId}`, "put");
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<IForm>();
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const submitHandler = (data: IForm) => {
        return editingPlanId
            ? editMutate({
                  price: data.price,
                  title: data.title,
                  description: data.description,
                  properties: personName,
              })
            : createMutate({
                  price: data.price,
                  title: data.title,
                  description: data.description,
                  properties: personName,
              });
    };

    useEffect(() => {
        if (isCreateSuccess) {
            toast.success("Created Successfully");
            setIsBarOpen(false);
            reset({
                title: "",
                description: "",
                price: "",
            });
            setPersonName([]);
        }
    }, [isCreateSuccess]);

    const editClickHandler = (e: any, row: IPlan) => {
        setEditingPlanId(row._id);
        e.stopPropagation();
        setIsBarOpen(true);
        reset({
            title: row.title,
            price: row.price,
            description: row.description,
        });
        setPersonName(row.properties);
    };

    const clearFunction = () => {
        setPersonName([]);
        setEditingPlanId(undefined);
        reset({
            title: "",
            description: "",
            price: "",
        });
    };

    const closeModalHandler = () => {
        setIsBarOpen(false);
        clearFunction();
    };

    useEffect(() => {
        if (IsSuccessfull) {
            toast.success("Edited successfully");
            setIsBarOpen(false);
            clearFunction();
        }
    }, [IsSuccessfull]);

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
        <PlansContainer>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {isBarOpen && (
                    <BackDrop onClick={closeModalHandler}>
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
                                        {editingPlanId ? "Edit" : "Add"} Plans
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
                                    <Grid>
                                        <TextField
                                            sx={{ width: "100%" }}
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
                                            sx={{ width: "100%" }}
                                            control={control}
                                            name="price"
                                            label="Price $"
                                            dark={true}
                                            variant="outlined"
                                            errors={errors}
                                            type="number"
                                            rules={{
                                                required: true,
                                            }}
                                        />
                                        <Select
                                            sx={{
                                                width: "100%",
                                                marginBottom: "30px",
                                            }}
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            label="Properties"
                                            multiple
                                            value={personName}
                                            onChange={handleChange}
                                            input={
                                                <OutlinedInput label="Properties" />
                                            }
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(
                                                        name,
                                                        personName,
                                                        theme
                                                    )}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <TextField
                                            sx={{ width: "100%" }}
                                            control={control}
                                            name="description"
                                            label="Description"
                                            multiline
                                            value={"qwerty"}
                                            variant="outlined"
                                            dark={true}
                                            errors={errors}
                                            type="text"
                                            rules={{
                                                required: true,
                                            }}
                                        />
                                    </Grid>
                                </main>
                            </form>
                        </motion.div>
                    </BackDrop>
                )}
            </AnimatePresence>

            <motion.div animate={{ width: "100%" }}>
                <Table
                    columns={[
                        {
                            field: "title",
                            headerName: "Title",
                            resizable: true,
                            flex: 1,
                        },
                        {
                            field: "price",
                            headerName: "Price",
                            flex: 1,
                        },

                        {
                            field: "description",
                            headerName: "Description",
                            resizable: true,
                            flex: 1,
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
                            field: "properties",
                            headerName: "Properties",
                            resizable: true,
                            flex: 1,
                            renderCell: (
                                params: GridRenderCellParams<any, any, any>
                            ) => (
                                <Tooltip
                                    title={params.row.properties.join(", ")}
                                    placement="bottom-start"
                                >
                                    <span>
                                        {params.row.properties.join(", ")}
                                    </span>
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
                                <div className="actions">
                                    <Button
                                        onClick={(e) =>
                                            editClickHandler(e, params.row)
                                        }
                                    >
                                        <BiEditAlt
                                            style={{ fontSize: "20px" }}
                                        />
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    dataUrl="price"
                    addable={true}
                    searchable={true}
                    setIsBarOpen={setIsBarOpen}
                    isAddedSuccess={isCreateSuccess}
                    reset={reset}
                    IsSuccessfull={IsSuccessfull}
                />
            </motion.div>
        </PlansContainer>
    );
};

export default Plans;
