import { lightMode } from "./../../../style/global.style";
import styled from "styled-components";

export const ModalContainer = styled.div`
    .div-content {
        min-height: 50vh;
        max-height: 100vw;
        width: 50vw;
        background-color: ${lightMode.primaryColor2};
        z-index: 444;
        

        border-radius: 1rem;
        header {
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            width: 100%;
            padding: 20px 60px;
            background-color: ${lightMode.primaryColor};
            display: flex;
            justify-content: space-between;
        }

        main {
            padding: 20px;
            width: 100%;
        }
    }

    .MuiInputBase-root {
        color: #fff;
        &:hover fieldset {
            border-color: #1976d2;
        }
    }

    .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: 1px solid #fff;
    }
`;
