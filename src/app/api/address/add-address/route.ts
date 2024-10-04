import { isAuthUser } from "@/auth/isAuthUser"
import { Address } from "@/model/address";
import { DbConnect } from "@/utils/DbConnect";
import { errorMonitor } from "events";

export async function POST(request: Request) {

    const user = await isAuthUser(request);
    if (user) {
        try {
            await DbConnect()

            const { city, state, pinCode, country, fullName, address } = await request.json()

            const newAddress = await Address.create(
                {
                    user: user.id,
                    city,
                    state,
                    pinCode,
                    country,
                    fullName,
                    address
                }
            )
            if (!newAddress) {
                return Response.json(
                    {
                        success: false,
                        message: "Failed to create new address"
                    },
                    {
                        status: 500
                    }
                )
            }

            return Response.json(
                {
                    success: true,
                    message: "Address updated successfully",
                    data: newAddress
                },
                {
                    status: 200
                }
            )


        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to update address",
                    error
                },
                {
                    status: 500
                }
            )
        }
    } else {
        return Response.json(
            {
                success: false,
                message: "Unauthorized to update address"
            },
            {
                status: 401
            }
        )
    }


}