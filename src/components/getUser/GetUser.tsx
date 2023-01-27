import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/store";
import { useApi } from "../../hooks";
import { IUserProfile, getUserFunc } from "./GetUserSlice";

const useGetUser = () => {
    const dispatch = useDispatch();
    const {
        data: dataBack,
        isSuccess,
        refetch,
    } = useApi<IUserProfile>(
        "admin",
        {},
        {
            enabled: !!localStorage.getItem("token"),
        }
    );
    const { data } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (isSuccess) {
            dispatch(getUserFunc(dataBack?.data));
        }
    }, [isSuccess]);
    return {
        refetch,
    };
};

export default useGetUser;
