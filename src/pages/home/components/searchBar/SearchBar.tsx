import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/store";
import { HEADER_CLOSE, HEADER_OPEN } from "../../../../style/global.style";
import { SearchBarContainer } from "./SearchBar.style";

const SearchBar = () => {
    // ?Redux
    const { value } = useSelector((state: RootState) => state.sideBarData);

    const [yOffset, setYOffset] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const [age, setAge] = useState("");

    // ? Hide and Show on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function handleScroll() {
        const currentYOffset = window.pageYOffset;
        const visible = yOffset > currentYOffset;

        setYOffset(currentYOffset);
        setVisible(visible);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <SearchBarContainer visible={visible}>
            <motion.div
                animate={{ left: value ? HEADER_OPEN : HEADER_CLOSE }}
                className="searchBar-container"
            >
                <TextField label="Search.." sx={{width: "70%"}} variant="outlined" />
                <FormControl sx={{width: "30%", marginLeft: "30px"}}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </motion.div>
        </SearchBarContainer>
    );
};

export default SearchBar;
