import { createContext, useContext, useState } from 'react';

import { AuthService } from '@/services/auth.service';
import { AuthContextType, AuthTokens } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [tokens, setTokens] = useState<AuthTokens | null>(() => {
        if (typeof window !== 'undefined') {
            const savedTokens = localStorage.getItem('auth_tokens');

            return savedTokens ? JSON.parse(atob(savedTokens)) : null;
        }

        return null;
    });

    const login = async (username: string, password: string) => {
        const response = await AuthService.login({ username, password });
        const newTokens = {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
        };
        setTokens(newTokens);
        localStorage.setItem('auth_tokens', btoa(JSON.stringify(newTokens)));
    };

    const logout = () => {
        setTokens(null);
        localStorage.removeItem('auth_tokens');
    };

    return <AuthContext.Provider value={{ tokens, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
