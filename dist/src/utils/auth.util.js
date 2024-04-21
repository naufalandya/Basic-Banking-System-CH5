"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.restrict = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (typeof process.env.JWT_SECRET === 'undefined') {
    throw new Error('JWT_SECRET environment variable is not defined');
}
const { JWT_SECRET } = process.env;
const restrict = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.split(' ')[1]) {
        res.status(401).json({
            status: false,
            message: 'token not provided!',
            data: null
        });
        return;
    }
    const token = authorization.split(' ')[1];
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: err.message,
                data: null
            });
        }
        delete user.iat;
        req.user = user;
        next();
    });
};
exports.restrict = restrict;
const isAdmin = (req, res, next) => {
    console.log(req.body);
    if (req.user.role !== 'ADMIN') {
        res.status(401).json({
            message: 'Only admin can access!',
            data: null
        });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
