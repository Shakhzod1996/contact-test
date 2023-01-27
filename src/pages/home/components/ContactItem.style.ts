import styled from "styled-components";

export const ContactItemContainer = styled.div `
border: 1px solid #3a484f;
margin-bottom: 20px;
padding: 1rem;
border-radius: 1rem;
box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
display: flex;
align-items: center;
justify-content: space-between;
position: relative;

.relationship {
    padding: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #3a484f;
    border-top-right-radius: 1rem;
}

.contact-info {
    display: flex;
    align-items: center;
    gap: 20px;

    h3 {
        font-size: 22px;
        margin-bottom: 10px;
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
}


.contact-item-actions {
    display: flex;
    align-items: center;
    /* gap: 10px; */
}

`