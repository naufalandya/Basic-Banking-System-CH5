import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import usersModel from '../model/users.model';
import jwt, { Secret } from 'jsonwebtoken';
import '../utils/auth.util'

const { JWT_SECRET }: NodeJS.ProcessEnv = process.env;

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

        await bcrypt.hash(password, 10).then( async (isMatch) => {
            if(isMatch){

                console.log(password)

                let user = await usersModel.createUser(username, email, password)

                console.log(user?.password)

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

            } else {
                return res.status(500).json({
                    status: false,
                    message: 'Invalid',
                    data: "Internal server error"
                });
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {

        let { email, password } : RequestBody = req.body;
        
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'email and password are required!',
                data: null
            });
        }

        const user = await prisma.users.findFirst({ where: { email } });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'invalid email',
                data: null
            });
        }

        const encryptedPassword : string = user.password

        console.log(password, encryptedPassword)
      
        await bcrypt.compare(password, encryptedPassword).then((isPasswordCorrect : boolean) => {
            console.log(isPasswordCorrect)
            if(isPasswordCorrect){
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
            } else {
                if (!isPasswordCorrect) {
                    return res.status(400).json({
                        status: false,
                        message: 'invalid password!',
                        data: null
                    });
                }
            }
        })  

    } catch (error) {
        next(error);
    }
}


export async function whoami(req : Request , res : Response, next : NextFunction) {
    try {

        const user = req.user

        res.json({
            status: true,
            message: 'OK',
            data: user
        });

    } catch (error) {
        next(error);
    }
}