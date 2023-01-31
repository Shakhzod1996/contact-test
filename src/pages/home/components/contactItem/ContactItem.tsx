import { MenuItem } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { ContactItemContainer } from "../ContactItem.style";
// @ts-ignore
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
// @ts-ignore
import def from "../../../../assets/images/user.jpg";
import { changeStatusFunc } from "../../../../layout/header/components/HeaderSlice";
import { getContactInfo, getDeletedId } from "../../ContactsSlice";
import { IOneContact } from "../../types/Contact.types";
import { useForm } from "react-hook-form";
interface IProps {
    setIsMOdalOpen: Dispatch<SetStateAction<boolean>>;
    item: IOneContact;
    setEditId: Dispatch<React.SetStateAction<string | undefined>>;
}
const ContactItem: React.FC<IProps> = ({ setIsMOdalOpen, item, setEditId }) => {
    const dispatch = useDispatch();
    
    // ? Delete Button Clicked
    const deleteWindowOpen = (item: IOneContact) => {
        dispatch(getDeletedId(item._id));
        setIsMOdalOpen(true);
    };

    // ? Edit Button clicked
    const editButtonClicked = (item: IOneContact) => {
        // @ts-ignore
        dispatch(getContactInfo(item))
        
        dispatch(changeStatusFunc());
        setEditId(item._id);
    };

    return (
        <ContactItemContainer>
            <div className="contact-info">
                <img
                    src={item.image ? `${process.env.REACT_APP_BASE_URL}/public/uploads/${item.image}` :     def
                           
                    }
                    alt="user-images"
                />
                <div>
                    <h3>{item.firstName + " " + item.lastName}</h3>
                    <h4>{item.phoneNumber}</h4>
                </div>
            </div>

            <div className="contact-item-actions">
                <MenuItem
                    onClick={() => editButtonClicked(item)}
                    sx={{ color: "#999", justifyContent: "center" }}
                >
                    <AiOutlineEdit style={{ fontSize: "28px" }} />
                </MenuItem>
                <MenuItem
                    onClick={() => deleteWindowOpen(item)}
                    sx={{ color: "#777", justifyContent: "center" }}
                >
                    <MdDelete style={{ fontSize: "28px" }} />
                </MenuItem>
            </div>

            <div className="relationship">
                {item.relationshipId !== null ? item?.relationship?.name : null}
            </div>
        </ContactItemContainer>
    );
};

export default ContactItem;
