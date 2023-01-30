import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/elements/modal/Modal";
import { IRelation } from "../../components/elements/modal/types/Relation.types";
import { RootState } from "../../features/store";
import { useApi } from "../../hooks";
import ContactItem from "./components/contactItem/ContactItem";
import ContactSkeleton from "./components/contactItemSkeleton/ContactItem";
import DeleteModal from "./components/deleteModal/DeleteModal";
import SearchBar from "./components/searchBar/SearchBar";
import { HomeContainer } from "./Home.styled";
import { IOneContact } from "./types/Contact.types";

const Home = () => {
    const dispatch = useDispatch();
    // !Hooks
    const [search, setSearchValue] = useState("");
    const [editId, setEditId] = useState<string | undefined>("");

    // ! Redux data
    const { isBarOpen } = useSelector((state: RootState) => state.headerInfo);
    const { selectedId } = useSelector((state: RootState) => state.contacts);

    // ! Fetching Data
    const { data, isSuccess, refetch, isLoading } = useApi<IOneContact[]>(
        "contact",
        {
            search,
            relationshipId: selectedId
        }
    );

    const { data: relationShipData, isSuccess: relateSuccess } =
        useApi<IRelation[]>("relationship");

    


    const [isModalOpen, setIsMOdalOpen] = useState(false);

    return (
        <HomeContainer>
            <motion.div animate={{ width: "100%" }} className="chart-container">
                <Modal
                    setEditId={setEditId}
                    editId={editId}
                    isBarOpen={isBarOpen}
                    postUrl="/contact"
                    editUrl="/contact"
                    refetch={refetch}
                    relationShipData={relationShipData}
                    isSuccess={relateSuccess}
                />

                <SearchBar
                    setSearchValue={setSearchValue}
                    searchValue={search}
                    relationShipData={relationShipData}
                />
                {data?.data && data?.data.length > 0 ? (
                    <>
                        <DeleteModal
                            isModalOpen={isModalOpen}
                            setIsMOdalOpen={setIsMOdalOpen}
                            refetch={refetch}
                        />
                        {isLoading ? (
                            <ContactSkeleton />
                        ) : (
                            <>
                                {data?.data.map((item) => {
                                    return (
                                        <ContactItem
                                            setEditId={setEditId}
                                            item={item}
                                            key={item._id}
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
                            <h2>Not Found !</h2>
                            <p>Not Any Contacts found</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </HomeContainer>
    );
};

export default Home;
