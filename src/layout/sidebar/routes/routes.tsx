import { AiOutlineAppstore } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { RiContactsBookLine } from 'react-icons/ri';
export const routes = [
    { path: "/", name: "Contacts", icon: <RiContactsBookLine /> },
    // { path: "/tasks", name: "Tasks", icon: <FaTasks /> },
    { path: "/products", name: "Products", icon: <BiCartAlt /> },
    { path: "/plans", name: "Plans", icon: <ImPriceTag /> },
    {
        path: "/applications",
        name: "Applications",
        icon: <AiOutlineAppstore />,
    },
    // { path: "/admins", name: "Admins", icon: <MdAdminPanelSettings /> },
];
