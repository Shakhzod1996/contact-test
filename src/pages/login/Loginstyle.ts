import styled from "styled-components";
import { lightMode } from "../../style/global.style";

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .real-text-field {
        margin-bottom: 30px;
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
                transition: all 0.2s ease;
            }
            &:hover fieldset {
                border-color: #1976d2;
            }
        }
    

    .login-content {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 3rem;
        background-color: ${lightMode.primaryColor};
        border-radius: 1rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        h2 {
            color: ${lightMode.whiteColor};
            font-size: 28px;
        }

        p {
            color: ${lightMode.whiteColor2} !important;
        }
    }

    .form {
        display: flex;
        flex-direction: column;
    }

    .forget-password {
        margin-top: -20px;
        display: flex;
        justify-content: right;
        margin-bottom: 30px;
        p {
            text-decoration: underline;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                color: #1976d2 !important;
            }
        }
    }

    .sign-btn-container {
        display: flex;
        gap: 20px;
        align-items: center;
    }
`;
