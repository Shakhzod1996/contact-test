import styled from "styled-components";

export const HomeContainer = styled.div`
    .home-container {
    }

    .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        div {
            text-align: center;
            h2 {
                margin-bottom: 1rem;
                font-size: 30px;
            }

            p {
               font-size: 20px;
               margin-bottom: 1rem;
            }
        }
    }
`;
