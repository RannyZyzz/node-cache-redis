import dotenv from 'dotenv'
dotenv.config()
import { NextFunction, Request, Response } from "express";
import { verify, decode } from "jsonwebtoken";

export async function authentication(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        response.statusCode = 401
        return response.json({ error: "Header Unauthorized!" })
    }

    const [, token] = authHeader.split(" ")

    try {
        verify(token, process.env.JWT_SECRET)

        const { sub: userId } = decode(token)

        request.userId = String(userId)

        return next()
    } catch (err) {
        response.statusCode = 401
        return response.json({ error: "Catch Unauthorized!" })
    }
}