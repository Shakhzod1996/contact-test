import { lightMode } from './../../style/global.style';
import styled from "styled-components";
interface IProps {
    value: boolean
}
export const SidebarContainer = styled.div<IProps>`

.css-fvc8ir-MuiBadge-badge {
    background-color: #fff !important;
}
    .top-section {
        width: 100%;
        padding: ${props => props.value ? "1rem" : ".7rem"};
        padding-top: 0;
        padding-bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;

        button {
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            svg {
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .sidebar {
        background-color: ${lightMode.primaryColor};
        width: 100%;
        left: 1rem;
        top: 1rem;
        right: 1rem;
        color: #fff;    
        height: 100vh;
        position: fixed;
        border-radius: 1rem;
        bottom: 100px;
    }

    .link-text {
        white-space: nowrap;
    }

    .sidebar-link {
        transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-right: 4px solid ${lightMode.primaryColor};
        padding: 8px;
        text-decoration: none;
        padding-left: 1rem;
        svg {
            font-size: 18px;
        }

        color: #fff;
        &:hover {
            border-right: 4px solid #fff;
            background-color: #44545b;
            transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
        }
    }

    .routes {
        padding: 1rem;
        padding-top: 0;
        padding-right: 0;
        padding-left: 0;
    }
`;
