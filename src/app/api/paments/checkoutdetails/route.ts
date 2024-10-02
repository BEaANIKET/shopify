// /api/checkout.js

import { isAuthUser } from '@/auth/isAuthUser';
import { Cart } from '@/model/cart';

export async function GET(request: Request) {
    console.log("HEllo I am working ")
    const user = await isAuthUser(request);

    if (user) {
        try {
            const userId = user.id
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                return Response.json(
                    {
                        success: false,
                        message: 'Cart not found',
                    },
                    {
                        status: 404,
                    }
                )
            }
            console.log(cart)

            const totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const totalSavedPrice = cart.products.reduce(
                (sum, item) => sum + item.price * item.quantity * (item.priceDrop / 100),
                0
            );

            return Response.json(
                {
                    success: true,
                    message: 'Checkout details fetched successfully',
                    totalPrice,
                    totalSavedPrice,
                    products: cart.products,
                },
                {
                    status: 200,
                }
            )
        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: 'Failed to fetch checkout details',
                    error
                },
                {
                    status: 500,
                }
            )
        }
    } else {
        return Response.json(
            {
                success: false,
                message: "Unauthorized to fetch checkout details"
            },
            {
                status: 401
            }
        )
    }
}
