
'use client';

import { useEffect } from 'react';
import { AuthService } from '@/services/auth.service';

export default function LogoutPage() {
    useEffect(() => {
        AuthService.logout();
    }, []);

    return null;
}
