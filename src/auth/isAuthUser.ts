import { jwtDecode } from "jwt-decode";

export const isAuthUser = async (request: Request) => {

    try {
        const token = await request.cookies.get('token');
        const user = jwtDecode(token.value)
        return user
    }
    catch (error) {
        return false;
    }
}
