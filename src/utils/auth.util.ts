import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

interface User {
    id: string;
    username: string;
    role: string;
}

const { JWT_SECRET }: NodeJS.ProcessEnv = process.env;

const restrict = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.split(' ')[1]) {
        res.status(401).json({  
            status: false,
            message: 'Token not provided!',
            data: null
        });
        return;
    }

    const token: string = authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET as string, (err: any | null, decoded: object | any ): void => {
        if (err) {
            res.status(401).json({
                status: false,
                message: err.message,
                data: null
            });
            return;
        }
        const user = decoded as User; 
        if (!user) {
            res.status(401).json({
                status: false,
                message: 'User not found in token!',
                data: null
            });
            return;
        }
        delete (user as any).iat;
        req.user = user;
        next();
    });
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const user: User = req.user as User;
    if (!user || user.role !== 'ADMIN') {
        res.status(401).json({
            status: false,
            message: 'Only admin can access!',
            data: null
        });
        return;
    }
    next();
};

export { restrict, isAdmin };
