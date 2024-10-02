import { isAuthUser } from "@/auth/isAuthUser";
import { Product } from "@/model/product"
import { DbConnect } from "@/utils/DbConnect"


export async function GET(request: Request) {

    const user = await isAuthUser(request);
    if (user?.role === 'Admin') {
        try {
            await DbConnect();
            const allData = await Product.find()
            if (allData) {
                return Response.json(
                    {
                        success: true,
                        message: "All products fetched successfully",
                        allData: allData
                    },
                    {
                        status: 200
                    }
                )
            }
        } catch (error) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to fetch products",
                    error: error
                },
                {
                    status: 500
                }
            )
        }
    }
    else {
        return Response.json(
            {
                success: false,
                message: "Unauthorized to fetch products"
            },
            {
                status: 401
            }
        )
    }


}