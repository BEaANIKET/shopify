
import jwt from 'jsonwebtoken';
import { decodeReply } from 'next/dist/server/app-render/entry-base';
import { jwtDecode } from 'jwt-decode';

export const verifyAuthToken = async (token: string) => {

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        return null;
    }
};
