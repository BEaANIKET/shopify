import { isAuthUser } from "@/auth/isAuthUser";
import { Product } from "@/model/product";
import { DbConnect } from "@/utils/DbConnect";


export async function PUT(request: Request) {
    const user = await isAuthUser(request);

    if (user?.role === 'Admin') {
        try {
            await DbConnect()
            const { searchParams } = new URL(request.url)
            const _id = searchParams.get('id')

            if (!_id) {
                return Response.json(
                    {
                        success: false,
                        message: "Missing _id parameter"
                    },
                    {
                        status: 400
                    }
                )
            }
            const {
                size,
                name,
                price,
                description,
                category,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl,
            } = await request.json();

            const updatedProduct = await Product.findByIdAndUpdate(
                {
                    _id,
                },
                {
                    size,
                    name,
                    price,
                    description,
                    category,
                    deliveryInfo,
                    onSale,
                    priceDrop,
                    imageUrl,
                },
                {
                    new: true
                }
            )

            if (!updatedProduct) {
                return Response.json(
                    {
                        success: false,
                        message: "Failed to add product"
                    },
                    {
                        status: 400
                    }
                )
            }

            return Response.json(
                {
                    product: updatedProduct,
                    success: true,
                    message: "Product added successfully"
                },
                {
                    status: 201
                }
            )

        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: error?.message || "Internal Server Error"
                },
                {
                    status: 500
                }
            )
        }
    }

}