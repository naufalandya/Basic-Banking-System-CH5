import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
interface User {
    id: string;
    username: string;
    role: string;
}

if (typeof process.env.JWT_SECRET === 'undefined') {
    throw new Error('JWT_SECRET environment variable is not defined');
}

const { JWT_SECRET }: NodeJS.ProcessEnv = process.env;

const restrict = (req: Request, res: Response, next: NextFunction): void => {

        const { authorization } = req.headers;

        if (!authorization || !authorization.split(' ')[1]) {
            res.status(401).json({
                status: false,
                message: 'token not provided!',
                data: null
            });

            return
        }

        const token: string = authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            delete user.iat;

            req.user = user
            next();
        });
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {

    console.log(req.body)

        if (req.user.role !== 'ADMIN') {
                res.status(401).json({
                message: 'Only admin can access!',
                data: null
            });

            return 
        }

        next();
};

export { restrict, isAdmin };
