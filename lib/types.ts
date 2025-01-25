export interface UserFormDto {
    email: string;
    fullName: string;
    password: string;
    userName: string;
}

export interface ResponseDto {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
    error?: Record<string, unknown>;
    statusCode: number;
}

export interface UserDto {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    emailVerified: boolean;
    role: string;
    status: 'ENABLED' | 'DISABLED';
    createdAt: Date;
    updatedAt: Date;
}