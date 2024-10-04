import { Cart } from "@/model/cart";
import mongoose from "mongoose";
import { isAuthUser } from "@/auth/isAuthUser";

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
        // Parse the request body to get userId and productId
        const { productId, userId } = await request.json();

        // Convert productId and userId to ObjectId if they are not already
        const objectProductId = new mongoose.Types.ObjectId(productId);
        const objectUserId = new mongoose.Types.ObjectId(userId);

        // Debugging: Check if the cart exists for the user
        const existingCart = await Cart.findOne({ userId: objectUserId });
        if (!existingCart) {
            return new Response(JSON.stringify({
                success: false,
                message: "Cart not found for this user"
            }), { status: 404 });
        }

        // Remove the product from the cart's products array using $pull
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: objectUserId },
            {
                $pull: {
                    products: { productId: objectProductId } // Remove the product with matching productId
                }
            },
            {
                new: true // Return the updated document
            }
        );

        // Check if the update was successful
        if (!updatedCart) {
            return new Response(JSON.stringify({
                success: false,
                message: "Failed to remove product from cart"
            }), { status: 400 });
        }

        // Return success response with the updated cart data
        return new Response(JSON.stringify({
            success: true,
            message: "Product removed successfully",
            data: updatedCart
        }), { status: 200 });

    } catch (error) {
        // Handle and log any errors
        console.error("Error:", error.message);
        return new Response(JSON.stringify({
            success: false,
            message: "An error occurred while removing the product",
            error: error.message || "Unknown error"
        }), { status: 500 });
    }
}
