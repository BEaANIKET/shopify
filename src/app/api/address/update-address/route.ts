
import { isAuthUser } from "@/auth/isAuthUser";
import { Address } from "@/model/address";
import { DbConnect } from "@/utils/DbConnect";
export async function POST(request: Request) {
    const user = await isAuthUser(request);
    if (user) {
        try {
            await DbConnect()
            const { searchParams } = new URL(request.url)
            const addressId = searchParams.get('addressId')
            const { city, state, pinCode, country, fullName, address, number } = await request.json()
            if (!addressId) {
                return Response.json({
                    success: false,
                    message: "Address ID is required"
                }, {
                    status: 400
                })
            }

            const updateAddress = await Address.findByIdAndUpdate(
                {
                    _id: addressId,
                },
                {
                    city,
                    state,
                    pinCode,
                    country,
                    fullName,
                    address,
                    number
                },
                {
                    new: true
                }
            )

            if (!updateAddress) {
                return Response.json({
                    success: false,
                    message: "Failed to update address"
                }, {
                    status: 500
                })
            }

            return Response.json(
                {
                    success: true,
                    message: "Address updated successfully",
                    data: updateAddress
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
        return Response.json({
            success: false,
            message: "Unauthorized to view cart"
        }, {
            status: 401
        })
    }
}