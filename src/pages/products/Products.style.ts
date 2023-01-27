import styled from "styled-components";
import { lightMode } from "../../style/global.style";

export const ProductsContainer = styled.div`
    .div-content {
        min-height: 50vh;
        max-height: 100vw;
        width: 50vw;
        background-color: #fff;
        z-index: 444;
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
