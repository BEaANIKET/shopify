
import { User } from '@/model/userModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { DbConnect } from '@/utils/DbConnect'
import { cookies } from 'next/headers'

export async function POST(request: Request) {

    const { email, password } = await request.json()

    if (!email || !password) {
        return Response.json(
            {
                success: false,
                message: "Please provide email and password"
            },
            {
                status: 200
            }
        )
    }

    try {
        await DbConnect()
        const user = await User.findOne({ email })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect password"
                },
                {
                    status: 401
                }
            )
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            }, process.env.JWT_SECRET, { expiresIn: '1h' })

        const returnUserData = {
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token
        }
        const oneDay = 30 * 24 * 60 * 60
        cookies().set('token', token)
        return Response
            .json(
                {
                    success: true,
                    message: "User logged in successfully",
                    user: returnUserData
                },
                {
                    status: 200
                }
            )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Failed to login user",
                error: error
            },
            {
                status: 500
            }
        )
    }

}