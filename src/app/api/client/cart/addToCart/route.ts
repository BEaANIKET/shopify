import { isAuthUser } from "@/auth/isAuthUser";
import { Cart } from "@/model/cart";
import { DbConnect } from "@/utils/DbConnect";

export async function POST(request: Request) {

    const user = await isAuthUser(request);
    if (user) {
        try {
            await DbConnect();
            const { userId, productId } = await request.json()

            const existingCart = await Cart.find({ userId })
            if (existingCart.length > 0) {
                const productInCart = await existingCart[0].products.find(p => p.productId.toString() === productId.toString())
                if (productInCart) {
                    return Response.json(
                        {
                            success: true,
                            message: 'Product already exists in cart',
                        },
                        {
                            status: 409
                        }
                    )
                }
                else {
                    existingCart[0].products.push({ productId, quantity: 1 })
                }
                await existingCart[0].save()
            }
            else {
                const newCart = await new Cart({ userId, products: [{ productId, quantity: 1 }] })
                await newCart.save()
                if (!newCart) {
                    return Response.json({
                        success: false,
                        message: 'Failed to create cart'
                    }, { status: 500 })
                }
            }

            return Response.json({
                success: true,
                message: 'Product added to cart successfully'
            }, { status: 200 })

        } catch (error) {
            return Response.json({
                success: false,
                message: 'Failed to add product to cart',
                error
            }, { status: 500 })
        }
    }
    else {
        return Response.json(
            {
                success: false,
                message: 'Unauthorized to add product to cart'
            },
            {
                status: 401
            }
        )
    }

}