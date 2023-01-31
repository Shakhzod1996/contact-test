import { MenuItem } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ContactItemContainer } from "../ContactItem.style";

const ContactSkeleton = () => {

  const arr = [1,2,3,4] 
    return (
      <>
      {arr.map((item) => {
        return (
          <ContactItemContainer key={item}>
            <SkeletonTheme baseColor="#2a363b" highlightColor="#3f4f56">
                <div className="contact-info">
                    <Skeleton width={100} height={100} circle />
                    <div>
                        <h3 style={{width: "170px"}}>
                            <Skeleton />
                        </h3>
                        <h4 style={{width: "140px"}}>
                            <Skeleton />
                        </h4>
                        <p style={{width: "100px"}}><Skeleton /></p>
                    </div>
                </div>

                <div style={{gap: "20px"}} className="contact-item-actions">
                    <div style={{width: "50px"}}>
                        <Skeleton height={30} />
                    </div>
                    <div style={{width: "50px"}}>
                        <Skeleton height={30} />
                    </div>
                </div>

                <div style={{width: "100px"}} className="relationship"><Skeleton /></div>
            </SkeletonTheme>
        </ContactItemContainer>
        )
      })}
      
      </>
        
    );
};

export default ContactSkeleton;
