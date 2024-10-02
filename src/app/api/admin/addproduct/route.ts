import { Product } from "@/model/product";
import { productSchema } from "@/schema/productSchema";
import { DbConnect } from "@/utils/DbConnect"
import { isAuthUser } from '@/auth/isAuthUser'


export async function POST(request: Request) {
    await DbConnect();



    const user = await isAuthUser(request)

    if (user?.role === 'Admin') {
        try {
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

            const result = productSchema.safeParse(
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
                }
            )

            if (!result.success) {
                return Response.json(
                    {
                        success: false,
                        message: result.error.errors || " Item not valid "
                    },
                    {
                        status: 400
                    }
                )
            }

            const newProduct = new Product(
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
                }
            )

            const savedproduct = await newProduct.save();

            if (!savedproduct) {
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
                    product: savedproduct,
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
    } else {
        return Response.json({
            success: false,
            message: 'Unauthorized to add product'
        }, {
            status: 401
        })
    }
}