import { isAuthUser } from "@/auth/isAuthUser";
import { Order } from "@/model/order";
import { DbConnect } from "@/utils/DbConnect";

export async function POST(request) {
    const user = isAuthUser(request);

    if (user) {
        try {
            await DbConnect();
            const { data } = await request.json();
            const createdOrder = new Order(data);
            await createdOrder.save();
            return Response.json(
                {
                    success: true,
                    createdOrder
                },
                {
                    status: 200
                }
            );
        } catch (error) {
            console.error("Error creating order: ", error);

            return Response.json(
                {
                    success: false,
                    message: 'An error occurred while creating the order'
                },
                {
                    status: 500
                }
            );
        }
    } else {
        return Response.json(
            {
                success: false,
                message: 'Unauthorized access'
            },
            {
                status: 401
            }
        )
    }

}
