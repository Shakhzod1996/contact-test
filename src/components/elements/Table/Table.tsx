import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useApi, useApiMutation } from "../../../hooks";
import { TableContainerMain, TableHeadContainer } from "../Table.style";
import { BsSearch } from "react-icons/bs";

interface ITable {
    dataUrl: string;
    columns: GridColumns<any>;
    addable?: boolean;
    searchable?: boolean;
    setIsBarOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    isAddedSuccess?: boolean;
    reset?: () => void;
    IsSuccessfull?: boolean;
}
const Table: React.FC<ITable> = ({
    dataUrl,
    columns,
    addable,
    searchable,
    setIsBarOpen,
    isAddedSuccess,
    IsSuccessfull,
    reset,
}) => {
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [queryParams, setQueryParams] = useState<{
        limit: number;
        page: number;
        search: string;
    }>({
        limit: 10,
        page: 1,
        search: "",
    });

    const { data, status, refetch } = useApi(
        dataUrl,
        queryParams
        //      {
        //     refetchInterval: 1000,
        // }
    );
    const { mutate, isSuccess } = useApiMutation(dataUrl, "delete");

    const handleClickOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmitDeletedItems = () => {
        mutate({
            _ids: selectedRows,
        });
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isAddedSuccess) {
            refetch();
        }
    }, [isAddedSuccess]);

    useEffect(() => {
        if (IsSuccessfull) {
            refetch();
        }
    }, [IsSuccessfull]);

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    const addWindowOpenHandler = () => {
        // @ts-ignore
        setIsBarOpen(true);
        // @ts-ignore
        reset();
    };

    return (
        <>
            <Dialog
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Would you like to delete permenantly?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose}>CLose</Button>
                    <Button
                        color="error"
                        onClick={handleSubmitDeletedItems}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainerMain>
                <TableHeadContainer>
                    <div className="header-flex">
                        <Button
                            variant="outlined"
                            onClick={handleClickOpen}
                            disabled={selectedRows.length <= 0 ? true : false}
                        >
                            <BsFillTrashFill />
                        </Button>
                        {addable ? (
                            <Button
                                // @ts-ignore
                                onClick={addWindowOpenHandler}
                                variant="outlined"
                            >
                                Add
                            </Button>
                        ) : null}
                    </div>

                    {searchable && (
                        <div className="searchable">
                            <BsSearch />
                            <input
                                value={queryParams.search}
                                onChange={(e) =>
                                    setQueryParams((prev) => ({
                                        ...prev,
                                        search: e.target.value,
                                    }))
                                }
                                placeholder="Search..."
                                type="search"
                            />
                        </div>
                    )}
                </TableHeadContainer>
                <motion.div
                    animate={{ width: "100%" }}
                    className="grid-container"
                >
                    <DataGrid
                        rows={data?.data?.data}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={queryParams.limit}
                        rowsPerPageOptions={[10, 20, 50]}
                        onPageSizeChange={(newPageSize) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                limit: newPageSize,
                            }))
                        }
                        // initialState={{
                        //     pagination: {
                        //         page: queryParams.page,
                        //         pageSize:
                        //     },

                        // }}
                        onPageChange={(page, { reason }) => console.log(page)}
                        checkboxSelection
                        onSelectionModelChange={(rows, data) =>
                            setSelectedRows(rows)
                        }
                        sx={{ height: "100%" }}
                    />
                </motion.div>
            </TableContainerMain>
        </>
    );
};

export default Table;
