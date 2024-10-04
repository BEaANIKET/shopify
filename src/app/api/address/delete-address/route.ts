import { isAuthUser } from "@/auth/isAuthUser";
import { Address } from "@/model/address";
import { DbConnect } from "@/utils/DbConnect";

export async function DELETE(request: Request) {

    const user = await isAuthUser(request);

    if (user) {
        try {
            await DbConnect();
            const { searchParams } = new URL(request.url)
            const addressId = searchParams.get('addressId')
            const deletedAddress = await Address.findByIdAndDelete(
                { _id: addressId },
                { new: true }
            )

            if (!deletedAddress) {
                return Response.json({
                    success: false,
                    message: "Address not found"
                }, {
                    status: 404
                })
            }
            return Response.json(
                {
                    success: true,
                    message: "Address deleted successfully"
                },
                {
                    status: 200
                }
            )
        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to delete product",
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
            message: "Unauthorized to delete product"
        }, {
            status: 401
        })
    }
}