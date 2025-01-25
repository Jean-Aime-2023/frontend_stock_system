import { authorizedAPI, handleApiRequest } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";


const getUser = () => 
    handleApiRequest(() => authorizedAPI.get(`/user-management/user`));

export const useGetUser = () => 
    useQuery<any, AxiosError>({ queryKey: ['check-auth'], queryFn: getUser });