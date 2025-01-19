

import { cookiesUtil } from './cookies';

export class HttpClient {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async fetch(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        credentials: 'include',
      });

      if (response.status === 401) {
        cookiesUtil.clearAuthTokens();
        window.location.href = '/authentication';
        throw new Error('Unauthorized');
      }

      return response;
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw error;
      }
      throw new Error('Request failed');
    }
  }
}

