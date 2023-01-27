import React from "react";
import { Triangle } from "react-loader-spinner";

const Loading = () => {
     return (
          <div className="lading-container">
               <Triangle
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperClass=""
                    wrapperStyle={{}}
                    visible={true}
               />
          </div>
     );
};

export default Loading;
