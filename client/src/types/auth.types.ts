export interface LoginResponse {
    token: string;
}

export interface User {
    id: number,
    userName: string
}

export interface RegisterResponse {
    message: string,
    user?: User
}