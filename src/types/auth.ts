
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthContextType {
    tokens: AuthTokens | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}
