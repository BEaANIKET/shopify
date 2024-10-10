import { isAuthUser } from "@/auth/isAuthUser";
import { Order } from "@/model/order";
import { DbConnect } from "@/utils/DbConnect";
import mongoose from "mongoose";

export async function GET(request: Request) {
    const user = await isAuthUser(request);

    if (user) {
        await DbConnect()
        const orders = await Order.aggregate([
            // Step 1: Match the order for the authenticated user
            {
                $match: { user: new mongoose.Types.ObjectId(user.id) }
            },
            {
                $lookup: {
                    from: 'addresses',
                    localField: 'deliveryAddress',
                    foreignField: '_id',
                    as: 'deliveryAddressDetails'
                }
            },
            {
                $unwind: '$deliveryAddressDetails'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderItem.productId',
                    foreignField: '_id',
                    as: 'orderItem.productDetails'
                }
            },
            {
                $project: {
                    _id: 1,
                    deliveryAddressDetails: 1,
                    orderItem: {
                        productDetails: 1,
                        quantity: 1,
                        price: 1
                    },
                    orderStatus: 1,
                    orderDate: 1,
                    paymentMethod: 1,
                    deliveryStatus: 1,
                    paymentStatus: 1,
                    trackingNumber: 1
                }
            }
        ]);

        // Check if orders exist
        // console.log(orders);

        if (!orders || orders.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "No orders found for this user"
                }), {
                status: 404
            }
            );
        }


        // Return the response with orders
        return new Response(
            JSON.stringify({
                success: true,
                orders: orders
            }), {
            status: 200
        }
        );

    } else {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Unauthorized to view orders"
            }), {
            status: 401
        }
        );
    }
}
