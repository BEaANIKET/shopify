import { isAuthUser } from "@/auth/isAuthUser";
import { Cart } from "@/model/cart";
import { DbConnect } from "@/utils/DbConnect";
import mongoose from 'mongoose'

export async function GET(request: Request) {
    const user = isAuthUser(request);

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
        await DbConnect();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        if (!userId) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User ID is required",
                }),
                { status: 400 }
            );
        }
        const userIdObj = new mongoose.Types.ObjectId(userId);
        const cart = await Cart.aggregate([
            {
                $match: { userId: userIdObj }
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $project: {
                    _id: 0,
                    productId: "$products.productId",
                    quantity: "$products.quantity",
                    "productDetails.name": 1,
                    "productDetails.price": 1,
                    "productDetails.description": 1,
                    "productDetails.imageUrl": 1,
                    "productDetails.priceDrop": 1,
                    "productDetails.category": 1,
                    "productDetails.size": 1
                }
            }
        ]);
        if (cart) {
            return Response.json(
                {
                    success: true,
                    message: "Cart items fetched successfully",
                    data: cart
                },
                {
                    status: 200
                }
            )
        }

        return Response.json(
            {
                success: false,
                message: "User does not have CartItems",
            },
            {
                status: 404
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch cart items",
                error: error.message || "Unknown error",
            }),
            { status: 500 }
        );
    }
}
