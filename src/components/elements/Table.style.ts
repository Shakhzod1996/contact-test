import styled from "styled-components";

export const TableContainerMain = styled.div`
    padding: 1rem;
    border: 1px solid #e3e3e3;
    border-radius: 0.5rem;
    height: auto;
    width: 100%;

    .grid-container {
        height: 65vh;
    }
`;

export const TableHeadContainer = styled.div`
    display: flex;
    justify-content: right;
    flex-direction: column;
    padding-bottom: 1rem;
    .header-flex {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: right;
        padding-bottom: 10px;
        border-bottom: 1px solid #e3e3e3;

        .Mui-disabled > svg {
            cursor: pointer !important;
        }

        
        button {
            width: 25px;
            height: 35px;
        }

        svg {
            transition: all 0.3s ease;
            font-size: 20px;
        }
    }

    .searchable {
        padding-top: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 10px;

        input {
            border: none;
            padding: 10px;
            width: 100%;
            font-size: 1rem;

        }
    }
`;
