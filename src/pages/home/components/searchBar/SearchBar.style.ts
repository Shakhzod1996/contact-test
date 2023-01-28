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

    .MuiInputBase-root {
        color: #fff;
        &:hover fieldset {
            border-color: #1976d2;
        }
    }

    .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
        color: #fff;
    }
    
    .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: 1px solid #fff;
    }
`