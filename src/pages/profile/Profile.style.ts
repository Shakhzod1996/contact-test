import { lightMode } from './../../style/global.style';
import styled from "styled-components";

export const ProfileContainer = styled.div `
padding-top: 20px;
    h1{
        margin-bottom: 20px;
    }
.profile-main {
    width: 70%;
    height: 500px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 20px;
    
}

.profile-top {
    width: 100%;
    height: 180px;
    background: ${lightMode.primaryColor};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.profile-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;

    

}

.image-container {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-top: -100px;
    border: 6px solid #fff;
    position: relative;
     img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
     }
}

.just-flex {
    display: flex;
    align-items: center;
    gap: 30px;
}
    
`


