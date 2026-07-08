export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    DRIVER = 'DRIVER',
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export interface HealthCheckResponse {
    status: string;
    timestamp: Date
}