import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express"


const prisma = new PrismaClient()

export class CreateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { username, name, password } = request.body
            const user = await prisma.users.findFirst({
                where: {
                    username: username
                }
            })

            if (user) {
                response.statusCode = 401;
                return response.json({ error: "Este usuário já existe!" })
            }

            //hashSenha
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = await prisma.users.create({
                data: {
                    name: name,
                    username: username,
                    password: passwordHash
                }
            })

            response.statusCode = 201;
            return response.json(newUser)

        } catch (e: any) {
            console.log(e.message)
            response.statusCode = 400;
            response.json({
                status: 400,
                mensagem: "Não foi possível incluir este beneficiário"
            })
        }
    }
}