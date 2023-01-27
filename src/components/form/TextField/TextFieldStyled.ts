import styled from "styled-components";
import { TextField, TextFieldProps } from "@mui/material";

export const TextFieldStyled = styled(TextField)`
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

export const TextFieldElementary = styled(TextField)`
   
`;

