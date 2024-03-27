import dotenv from 'dotenv';
dotenv.config()
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type User = {
    username: string;
    password: string;
    name: string;
    id: string;
}

export class LoginUserController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body

        const user: User = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        if (!user) {
            response.statusCode = 401
            return response.json({ error: "User Unauthorized!" })
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            response.statusCode = 401
            return response.json({ error: "Pass Unauthorized!" })
        }

        const token = sign({}, process.env.JWT_SECRET, {
            subject: user.id,
        })

        return response.json(token)
    }
}