import { cookiesUtil } from '@/lib/cookies';
import { AuthTokens, LoginRequest } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class AuthService {
    static async login(credentials: LoginRequest): Promise<AuthTokens> {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include' // Important for cookies
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const tokens = await response.json();
            cookiesUtil.setAuthTokens(tokens);

            return tokens;
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    static logout() {
        cookiesUtil.clearAuthTokens();
    }
}
