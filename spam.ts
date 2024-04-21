import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import usersModel from './src/model/users.model';
import jwt, { Secret } from 'jsonwebtoken';

const { JWT_SECRET }: NodeJS.ProcessEnv = process.env;

console.log(JWT_SECRET)

const prisma = new PrismaClient();

interface RequestBody {
    email: string;
    password: string;
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        if (JWT_SECRET === undefined) {
            throw new Error('JWT_SECRET is not defined');
        }

        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'email and password are required!',
                data: null
            });
        }

        let user = await prisma.users.findFirst({ where: { email } });

        console.log(password)
        console.log(user?.password);

        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'invalid email',
                data: null
            });
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log(isPasswordCorrect.valueOf())

        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: false,
                message: 'invalid password!',
                data: null
            });
        }

        const resUser = {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            role: user?.role
        }

        let token = jwt.sign(resUser, JWT_SECRET as Secret);

        res.json({
            status: true,
            message: 'OK',
            data: { ...resUser, token }
        });

    } catch (error) {
        next(error);
    }
}