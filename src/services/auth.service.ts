

import { cookiesUtil } from '@/lib/cookies';
import { AuthTokens, LoginRequest } from '@/types/auth';
import { HttpClient } from '@/lib/http-client';

interface BackendAuthResponse {
    access: string;
    refresh: string;
}

export class AuthService {
    static async login(credentials: LoginRequest): Promise<AuthTokens> {
        try {
            const response = await HttpClient.fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.detail || 'Login failed');
            }

            const backendTokens: BackendAuthResponse = await response.json();

            const tokens: AuthTokens = {
                accessToken: backendTokens.access,
                refreshToken: backendTokens.refresh
            };

            cookiesUtil.setAuthTokens(tokens);

            return tokens;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            }
            throw new Error('Login failed: Unknown error');
        }
    }

    static logout() {
        cookiesUtil.clearAuthTokens();
        window.location.href = '/authentication';
    }
}

