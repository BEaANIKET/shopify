import { isAuthUser } from "@/auth/isAuthUser";
import { Order } from "@/model/order";
import { DbConnect } from "@/utils/DbConnect";
import mongoose from "mongoose";

export async function GET(request: Request) {
    const user = await isAuthUser(request);

    if (user && user.role === "Admin") {
        await DbConnect()
        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails'
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
                    userDetails: {
                        firstName: 1,
                        lastName: 1,
                        email: 1,
                    },
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
