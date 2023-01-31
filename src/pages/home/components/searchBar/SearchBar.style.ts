import { lightMode } from '../../../../style/global.style';
import styled from "styled-components";
interface IPropVisible {
    visible: boolean
}
export const SearchBarContainer = styled.div<IPropVisible> `
    .searchBar-container {
        position: fixed;
        background-color: ${lightMode.primaryColor};
        /* height: 60px; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        right: 0;
        top: ${props => props.visible ? "90px" : "20px"};
        left: 1rem;
        right: 1rem;
        border-radius: 1rem;
        transition: top .3s ease;
        z-index: 444;
        padding: 1rem;
    }

    .MuiFormLabel-root {
        color: #fff;
    }
    
    .MuiInputBase-root-MuiOutlinedInput-root {
        color: #fff;
    }

    .MuiOutlinedInput-root {
        color: #fff;
        fieldset {
            border-color: #fff;
            transition: all .2s ease;
        }
        &:hover fieldset {
            border-color: #1976d2;
        }
    }
`