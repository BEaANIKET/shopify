import { Product } from "@/model/product";

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId')
        if (!productId) {
            return Response.json({
                success: false,
                message: 'No product ID provided'
            },
                {
                    status: 400
                }
            );
        }

        const product = await Product.findById(productId)

        if (!product) {
            return Response.json({
                success: false,
                message: 'Product not found'
            },
                {
                    status: 404
                }
            );
        }

        return Response.json(
            {
                success: true,
                product
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        )
    }
}