import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/elements/modal/Modal";
import { RootState } from "../../features/store";
import SearchBar from "./components/searchBar/SearchBar";
import ContactItem from "./components/contactItem/ContactItem";
import { HomeContainer } from "./Home.styled";
import DeleteModal from "./components/deleteModal/DeleteModal";
import { Button } from "@mui/material";
import { changeStatusFunc } from "../../layout/header/components/HeaderSlice";
import ContactSkeleton from "./components/contactItemSkeleton/ContactItem";

const Home = () => {
    const dispatch = useDispatch();
    const { isBarOpen } = useSelector((state: RootState) => state.headerInfo);
    const [isModalOpen, setIsMOdalOpen] = useState(false);
    const isDataCome = true;
    const loading = true;

    return (
        <HomeContainer>
            <motion.div animate={{ width: "100%" }} className="chart-container">
                <Modal isBarOpen={isBarOpen} />
                {isDataCome ? (
                    <>
                        {" "}
                        <SearchBar />
                        <DeleteModal
                            isModalOpen={isModalOpen}
                            setIsMOdalOpen={setIsMOdalOpen}
                        />
                        {loading ? (
                            <ContactSkeleton />
                        ) : (
                            <>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => {
                                    return (
                                        <ContactItem
                                            key={item}
                                            setIsMOdalOpen={setIsMOdalOpen}
                                        />
                                    );
                                })}
                            </>
                        )}
                        <div className="contact-container"></div>
                    </>
                ) : (
                    <div className="no-data">
                        <div>
                            <h2>Do not Have Any Contacts Yet</h2>
                            <p>Press Button Below and Start Adding Contacts</p>
                            <Button
                                variant="outlined"
                                onClick={() => dispatch(changeStatusFunc())}
                            >
                                Start Adding Contact
                            </Button>
                        </div>
                    </div>
                )}
            </motion.div>
        </HomeContainer>
    );
};

export default Home;
