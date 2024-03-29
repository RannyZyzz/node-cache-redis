import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getRedis } from '../redisConfig';

// const prisma = new PrismaClient();

export class GetUserInfoController {
    async handle(request: Request, response: Response) {
        const { userId } = request

        console.time()

        const userRedis = await getRedis(`user-${userId}`)

        const userJson = JSON.parse(userRedis)

        // const user = await prisma.users.findUnique({
        //     where: {
        //         id: userId
        //     }
        // })

        console.timeEnd()


        return response.json(userJson)


    }
}