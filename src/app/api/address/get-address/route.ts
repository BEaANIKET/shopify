import { isAuthUser } from "@/auth/isAuthUser";
import { Address } from "@/model/address";
import { DbConnect } from "@/utils/DbConnect";


export async function GET(request: Request) {
    const user = await isAuthUser(request);
    if (user) {
        try {
            await DbConnect()

            const allAddressOfUser = await Address.find(
                {
                    user: user.id,
                },
            )
            if (allAddressOfUser.length > 0) {
                return Response.json(
                    {
                        success: true,
                        message: "Fetched all addresses successfully",
                        data: allAddressOfUser
                    },
                    {
                        status: 200
                    }
                )
            }
            return Response.json(
                {
                    success: false,
                    message: "No addresses found for this user"
                },
                {
                    status: 203
                }
            )
        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to fetch cart",
                    error
                },
                {
                    status: 500
                }
            )
        }
    } else {
        return Response.json({
            success: false,
            message: "Unauthorized to view cart"
        }, {
            status: 401
        })
    }
}