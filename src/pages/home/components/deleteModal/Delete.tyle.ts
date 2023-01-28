import { lightMode } from './../../../../style/global.style';
import styled from "styled-components";

export const DeleteModalContainer = styled.div`
    .delete-content {
        padding: 30px;
        background-color: ${lightMode.primaryColor2};
        text-align: center;
        border-radius: 1rem;
        h2 {
            padding: 0 !important;
            margin-bottom: 1rem;

        }
        p {
            margin-bottom: 1rem;
        }

        .btns-container {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
`