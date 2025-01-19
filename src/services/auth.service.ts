
import { cookiesUtil } from '@/lib/cookies';
import { AuthTokens, LoginRequest } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface BackendAuthResponse {
    access: string;
    refresh: string;
}

export class AuthService {
    static async login(credentials: LoginRequest): Promise<AuthTokens> {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.detail || 'Login failed');
            }

            const backendTokens: BackendAuthResponse = await response.json();

            // Map backend tokens to our format
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
    }
}
