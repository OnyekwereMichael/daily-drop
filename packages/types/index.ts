export const UserRole = {
    STOREOWNER: 'STOREOWNER',
    USER: 'USER',
    DRIVER: 'DRIVER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export interface HealthCheckResponse {
    status: string;
    timestamp: Date
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}