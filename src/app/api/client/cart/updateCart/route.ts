import { isAuthUser } from "@/auth/isAuthUser";
import { Cart } from "@/model/cart";

export async function POST(request: Request) {
    const user = await isAuthUser(request);
    if (!user) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized to view cart",
            },
            {
                status: 401
            }
        )
    }
    try {
        const { productId, userId, quantity } = await request.json();
        if (quantity < 1) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Quantity must be at least 1",
                }),
                { status: 400 }
            );
        }

        const cartItem = await Cart.findOneAndUpdate(
            { userId, "products.productId": productId },
            {
                $set: { "products.$.quantity": quantity },
            },
            { new: true }
        );

        if (!cartItem) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Failed to update the product quantity in the cart",
                }),
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Product quantity updated successfully",
                cartItem,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to update the product in the cart",
                error: error.message || "Unknown error",
            }),
            { status: 500 }
        );
    }
}
