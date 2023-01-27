import { borderRadius } from '@mui/system';
import { lightMode } from './../../style/global.style';
import styled from "styled-components";


interface IProps {
    visible: boolean
}
export const HeaderContainer = styled.div<IProps>`
    
    color: #fff;
    /* color: #000; */
    .header-container {
        position: fixed;
        background-color: ${lightMode.primaryColor};
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        right: 0;
        top: ${props => props.visible ? "1rem" : "-100%"};
        left: 1rem;
        right: 1rem;
        border-radius: 1rem;
        transition: top .3s ease;
        z-index: 444;
       
        .header-container-flex {
            display: flex;
            align-items: center;
            gap: 20px;
        }

    }
    .avatar-circle {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        cursor: pointer;
        border: 4px solid ${lightMode.primaryColor};
        transition: all .4s ease;

        &:hover {
        border: 4px solid #44545b;

        }

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .header-in {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
    }
`;
