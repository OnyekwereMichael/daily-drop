import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@daily-drop/types";
import { getToken, removeToken, saveToken } from "@/lib/auth";
import { api } from "@/lib/axios";
import { router } from "expo-router";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<User>;
    register: (userData: RegisterData) => Promise<User>;
    logout: () => Promise<void>;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        checkExistingSession()
    }, [])

    const checkExistingSession = async () => {
        setIsLoading(true);
        try {
            const token = await getToken();
            if (token) {
                const response = await api.get('/auth/me');
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error checking existing session:', error);
            removeToken();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<User> => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            await saveToken(response.data.token);
            setUser(response.data.user);
            return response.data.user;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData): Promise<User> => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/register', userData);
            await saveToken(response.data.token);
            setUser(response.data.user);
            return response.data.user;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await removeToken();
            setUser(null);
            router.replace('/authLayout');
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
