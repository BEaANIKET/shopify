import { isAuthUser } from "@/auth/isAuthUser";
import { Product } from "@/model/product";
import { DbConnect } from "@/utils/DbConnect";

export async function DELETE(request: Request) {

    const user = await isAuthUser(request)
    if (user?.role === 'Admin') {
        try {


            await DbConnect()
            const { searchParams } = new URL(request.url)
            const id = searchParams.get('id')
            if (!id) {
                return Response.json({
                    success: false,
                    message: 'No ID provided'
                }, {
                    status: 400
                })
            }

            const deleteProduct = await Product.findByIdAndDelete(id)
            if (!deleteProduct) {
                return Response.json({
                    success: false,
                    message: 'Failed to delete product'
                }, {
                    status: 500
                })
            }

            return Response.json({
                success: true,
                message: 'Product deleted successfully'
            }, {
                status: 200
            })

        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: 'Failed to delete product',
                    error
                },
                {
                    status: 500
                }
            )
        }
    }
    return Response.json(
        {
            success: false,
            message: 'Unauthorized to delete product'
        },
        {
            status: 401
        }
    )


}