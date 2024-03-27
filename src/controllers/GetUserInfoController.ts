import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetUserInfoController {
    async handle(request: Request, response: Response) {
        const { userId } = request

        console.time()

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        console.timeEnd()

        return response.json(user)
    }
}