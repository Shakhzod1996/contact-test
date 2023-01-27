import styled from "styled-components";
import { lightMode } from "../../style/global.style";

export const PlansContainer = styled.div`
    .div-content {
        min-height: 55vh;
        width: 50vw !important;
        background-color: #fff;
        z-index: 444;
        /* transition: all 0.2s ease; */

        header {
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
`;
