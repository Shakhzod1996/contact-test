import Table from "../../components/elements/Table/Table";
import { ApplicationContainer } from "./Application.style";
import { AnimatePresence, motion } from "framer-motion";
import { GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import {AiFillEye} from 'react-icons/ai'
import { borderRadius, padding } from "@mui/system";

const Applications = () => {
    return (
        <ApplicationContainer>
            <motion.div animate={{ width: "100%" }}>
                <Table
                    columns={[
                        {
                            renderCell: (
                                params: GridRenderCellParams<any, any, any>
                            ) => (
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                    }}
                                >
                                    {params?.row.unseen ? (
                                        ""
                                    ) : (
                                        <p
                                            style={{
                                                backgroundColor: "#44545b",
                                                color: "#fff",
                                                // borderRadius: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%"

                                            }}
                                        ><AiFillEye/></p>
                                    )}
                                    <span>{params?.row.name}</span>
                                </div>
                            ),
                            field: "name",
                            headerName: "Name",
                            resizable: true,
                            flex: 1,
                        },
                        {
                            field: "phoneNumber",
                            headerName: "Phone Number",
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
                            field: "email",
                            headerName: "Email",
                            resizable: true,
                            flex: 1,
                        },
                    ]}
                    dataUrl="application"
                    addable={false}
                    searchable={true}
                />
            </motion.div>
        </ApplicationContainer>
    );
};

export default Applications;
