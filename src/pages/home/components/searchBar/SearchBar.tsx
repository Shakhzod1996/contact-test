import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRelation } from "../../../../components/elements/modal/types/Relation.types";
import { RootState } from "../../../../features/store";
import { HEADER_CLOSE, HEADER_OPEN } from "../../../../style/global.style";
import { getSelectedId } from "../../ContactsSlice";
import { SearchBarContainer } from "./SearchBar.style";
interface IPropsSearch {
    setSearchValue: Dispatch<SetStateAction<string>>;
    searchValue: string;
    relationShipData: AxiosResponse<IRelation[], any> | undefined;
}
const SearchBar: React.FC<IPropsSearch> = ({
    searchValue,
    setSearchValue,
    relationShipData,
}) => {
    // ! Hooks
    const [yOffset, setYOffset] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const [selecteDId, SetSelecteDId] = useState("");

// @ts-ignore
    const SortedArr = [...relationShipData?.data, {name: "all", _id: "all"}]
    // ?Redux
    const dispatch = useDispatch()
    const { value } = useSelector((state: RootState) => state.sideBarData);
    // ? Hide and Show on scroll
    const { _id } = useSelector((state: RootState) => state.loginInfo);

    // !LifeCircle
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

        if (event.target.value === "all") {
            
            dispatch(getSelectedId(""))
        } else {
            SetSelecteDId(event.target.value);
        dispatch(getSelectedId(event.target.value))
        }
        
    };
    
    return (
        <SearchBarContainer visible={visible}>
            <motion.div
                animate={{ left: value ? HEADER_OPEN : HEADER_CLOSE }}
                className="searchBar-container"
            >
                <TextField
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    label="Search.."
                    sx={{ width: "70%" }}
                    variant="outlined"
                />
                <FormControl sx={{ width: "30%", marginLeft: "30px" }}>
                    <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selecteDId}
                        label="Age"
                        onChange={handleChange}
                    >
                        {SortedArr.map((item) => {
                            return(
                                <MenuItem key={item._id} value={item._id}>
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </motion.div>
        </SearchBarContainer>
    );
};

export default SearchBar;
