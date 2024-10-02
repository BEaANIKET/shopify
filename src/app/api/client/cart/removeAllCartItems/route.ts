import { Cart } from "@/model/cart";
import { DbConnect } from "@/utils/DbConnect";
import { isAuthUser } from "@/auth/isAuthUser";

export async function POST(request: Request) {

    const user = await isAuthUser(request);
    if (!user) {
        return Response.json(
            {
                success: false,
                message: "Login to clear cart",
            },
            {
                status: 401
            }
        )
    }
    try {
        await DbConnect()
        const userId = user.id
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { products: [] } },
            { new: true }
        )
        if (!cart) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Cart not found'
                }),
                {
                    status: 404
                }
            )
        }
        return new Response(
            JSON.stringify({
                success: true,
                message: 'All products removed from cart'
            }), {
            status: 200
        }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Failed to login',
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}