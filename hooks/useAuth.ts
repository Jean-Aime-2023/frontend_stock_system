import { ResponseDto, UserFormDto } from "@/lib/types";
import { authorizedAPI, unauthorizedAPI } from "@/utils";
import { handleApiRequest } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define types for request payloads
type ChangeEmailPayload = { id: string; newEmail: string };

// API function definitions
const register = (userData: UserFormDto) => 
    handleApiRequest(() => unauthorizedAPI.post('/auth/register', userData));

const login = (userData: Partial<UserFormDto>) => 
    handleApiRequest(() => unauthorizedAPI.post('/auth/login', userData));

const changeEmail = ({ id, newEmail }: ChangeEmailPayload) => 
    handleApiRequest(() => authorizedAPI.post(`/auth/change-email/${id}`, { newEmail }));

const sendActivationEmail = ({ email }: { email: string }) => 
    handleApiRequest(() => unauthorizedAPI.post(`/auth/send-activation-email`, { email }));

const activateAccount = ({ code, email }: { code: string, email: string }) => 
    handleApiRequest(() => authorizedAPI.post(`/auth/activate-account`, { code, email }))

const logout = () => {
    window.localStorage.clear();
    return handleApiRequest(() => authorizedAPI.delete('/auth/logout'));
};

const checkUsernameExists = (userName: string) => 
    handleApiRequest(() => unauthorizedAPI.post(`/auth/check-username-exists`, { userName }))


// Custom hooks for API interactions
export const useRegister = () => 
    useMutation<ResponseDto, AxiosError, UserFormDto>({ mutationFn: register });

export const useLogin = () => 
    useMutation<ResponseDto, AxiosError, Partial<UserFormDto>>({ mutationFn: login });

export const useChangeEmail = () => 
    useMutation<ResponseDto, AxiosError, ChangeEmailPayload>({ mutationFn: changeEmail });

export const useSendActivationEmail = () => 
    useMutation<ResponseDto, AxiosError, { email: string }>({ mutationFn: sendActivationEmail});

export const useActivateAccount = () => 
    useMutation<ResponseDto, AxiosError, { code: string, email: string }>({ mutationFn: activateAccount });

export const useLogout = () => 
    useMutation<ResponseDto, AxiosError>({ mutationFn: logout });

export const useCheckUsernameExists = () => 
    useMutation<ResponseDto, AxiosError, string>({ mutationFn: checkUsernameExists })