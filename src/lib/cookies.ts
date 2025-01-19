

import { Cookies } from 'react-cookie';
import { AuthTokens } from '@/types/auth';

const cookies = new Cookies();

export const cookieConfig = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 30 * 24 * 60 * 60 // 30 days
};

export const cookieNames = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token'
};

export const cookiesUtil = {
    setAuthTokens(tokens: AuthTokens) {
        cookies.set(cookieNames.accessToken, tokens.accessToken, cookieConfig);
        cookies.set(cookieNames.refreshToken, tokens.refreshToken, cookieConfig);
    },

    getAuthTokens(): AuthTokens | null {
        const accessToken = cookies.get(cookieNames.accessToken);
        const refreshToken = cookies.get(cookieNames.refreshToken);
        
        if (!accessToken || !refreshToken) return null;
        
        return { accessToken, refreshToken };
    },

    clearAuthTokens() {
        cookies.remove(cookieNames.accessToken, { path: '/' });
        cookies.remove(cookieNames.refreshToken, { path: '/' });
    }
};

