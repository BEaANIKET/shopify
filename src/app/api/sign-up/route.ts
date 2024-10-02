import { User } from "@/model/userModel";
import { DbConnect } from "@/utils/DbConnect";
import bcrypt from 'bcrypt'

export async function POST(request: Request) {


    const { firstName, lastName, email, password, role } = await request.json();


    // Validate inputs
    if (!firstName || !lastName || !email || !password || !role) {
        return Response.json(
            {
                success: false,
                message: "All feild are required"
            },
            {
                status: 400,
            }
        )
    }

    try {
        await DbConnect();
        // Check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "Email already exists"
                },
                {
                    status: 400,
                }
            )
        }

        const hashPassword = await bcrypt.hash(password, 16)
        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role
        });


        await newUser.save();
        return Response.json(
            {
                success: true,
                message: "User created successfully"
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Failed to create user"
            },
            {
                status: 500
            }
        );
    }
}