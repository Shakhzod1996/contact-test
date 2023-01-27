import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Modal from "../../components/elements/modal/Modal";
import { RootState } from "../../features/store";
import ContactItem from "./components/contactItem/ContactItem";
import { HomeContainer } from "./Home.styled";

const Home = () => {

    const {isBarOpen} = useSelector((state: RootState) => state.headerInfo) 
    return (
        <HomeContainer>
            <motion.div animate={{ width: "100%" }} className="chart-container">

                {/* <h1>Contacts</h1> */}
                {<Modal isBarOpen={isBarOpen} /> }

                <div className="contact-container">
               { [1,2,3,4,5,6,7,8,9,0].map((item) => {
                    return (
                        <ContactItem key={item} />

                    )
                    
                })}
                </div>
                
            </motion.div>
        </HomeContainer>
    );
};

export default Home;
