import { lightMode } from "./../../../style/global.style";
import styled from "styled-components";

export const ModalContainer = styled.div`
    .div-content {
        min-height: 50vh;
        max-height: 100vw;
        width: 50vw;
        background-color: ${lightMode.primaryColor2};
        z-index: 444;

        .image-father {
            /* margin-top: 60px; */
            text-align: center;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

        }
        .image-container {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 6px solid ${lightMode.primaryColor};
            position: relative;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

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
`;
