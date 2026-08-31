import api from "./api";
import type { LoginResponse, RegisterResponse } from "../types/auth.types";

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/api/auth/login', { userName, password });
    return data;
}

export const register = async (userName: string, password: string): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>('/api/auth/register', { userName, password });
    return data;
}