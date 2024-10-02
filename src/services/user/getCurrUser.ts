'use client'

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getCurrentUser = () => {
    const token = Cookies.get('token');

    if (!token) {
        ("No token found in cookies");
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        return null;
    }
};
