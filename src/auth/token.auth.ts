import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {hash, compare} from 'bcrypt';
import usersModel from '../model/users.model';
import jwt, { Secret } from 'jsonwebtoken';

const { JWT_SECRET }: NodeJS.ProcessEnv = process.env;

console.log(JWT_SECRET)

const prisma = new PrismaClient();
interface RequestBody {
    email: string;
    password: string;
}

export async function register(req : Request, res : Response, next : NextFunction) {
    try {
        let { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                status: false,
                message: 'username, email and password are required!',
                data: null
            });
        }

        let emailExist = await prisma.users.findFirst({ where: { email } });
        if (emailExist) {
            return res.status(409).json({
                status: false,
                message: 'email has already been used!',
                data: null
            });
        }

        let usernameExist = await prisma.users.findFirst({ where: { username } });
        if (usernameExist) {
            return res.status(409).json({
                status: false,
                message: 'username has already been used!',
                data: null
            });
        }

        let encryptedPassword = await hash(password, 10);

        console.log(encryptedPassword)
        
        let user = await usersModel.createUser(username, email, encryptedPassword)

        const resUser = {
            id : user?.id,
            username : user?.username,
            email : user?.email,
            role : user?.role
        }

        return res.status(201).json({
            status: true,
            message: 'OK',
            data: resUser
        });

    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        if (JWT_SECRET === undefined) {
            throw new Error('JWT_SECRET is not defined');
        }


        let { email, password } : RequestBody = req.body;
        
        cekpw(password);

        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'email and password are required!',
                data: null
            });
        }

        let user = await prisma.users.findFirst({ where: { email } });

        console.log(user)
     
        console.log(user?.password);

        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'invalid email',
                data: null
            });
        }
      
        const isPasswordCorrect = await compare(password, user.password)

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

export async function cekpw(password : string){
    const user = await prisma.users.findFirst({ where: { email : "55555@gmail.com"} });
    
    if (user) {
        const isPasswordCorrect = await compare(password, user.password)

        if (!isPasswordCorrect) {
           console.log(isPasswordCorrect)
        }
    }
       
}