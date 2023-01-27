import { useQuery, UseQueryOptions } from "react-query";
import { useMutation, UseMutationOptions } from "react-query";
import { AxiosResponse } from "axios";
import { MethodProps } from "../types/helperTypes";
import api from "../api/api";
import { toast } from "react-toastify";

const useApi = <Data = any, Error = any>(
    url: string,
    params: object = {},
    options: UseQueryOptions<AxiosResponse<Data>, Error> = {}
) =>
    // @ts-ignore
    useQuery([url, params], async () => api.get<Data>(url, { params }), {
        ...options,
    });

const useApiMutation = <Variables = any, Response = any, Error = any>(
    url: string,

    method: MethodProps,
    // @ts-ignore
    options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {}
) =>
    useMutation<AxiosResponse<Response>, Error, Variables>(
        (data) => {
            const response = api({ url, method, data });
            return response;
        },
        {
            onError(error, variables, context) {
                toast.error(
                    // @ts-ignore
                    typeof error?.message === "string" ? error?.message : ""
                );
            },
            ...options,
        }
    );

const useApiMutationWithId = <Variables = any, Response = any, Error = any>(
    url: string,
    method: MethodProps,
    // @ts-ignore
    options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {}
) =>
    useMutation<AxiosResponse<Response>, Error, Variables>(
        ({ id, data }: any) => {
            url = id ? url + "?id=" + id : url;
            const response = api({ url, method, data });
            return response;
        },
        // @ts-ignore
        { ...options }
    );

export { useApi, useApiMutation, useApiMutationWithId };
