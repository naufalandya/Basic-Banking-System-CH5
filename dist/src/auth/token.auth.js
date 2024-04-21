"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const users_model_1 = __importDefault(require("../model/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);
const prisma = new client_1.PrismaClient();
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { username, email, password, role } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'username, email and password are required!',
                    data: null
                });
            }
            let emailExist = yield prisma.users.findFirst({ where: { email } });
            if (emailExist) {
                return res.status(409).json({
                    status: false,
                    message: 'email has already been used!',
                    data: null
                });
            }
            let usernameExist = yield prisma.users.findFirst({ where: { username } });
            if (usernameExist) {
                return res.status(409).json({
                    status: false,
                    message: 'username has already been used!',
                    data: null
                });
            }
            let encryptedPassword = yield (0, bcrypt_1.hash)(password, 10);
            console.log(encryptedPassword);
            let user = yield users_model_1.default.createUser(username, email, encryptedPassword);
            const resUser = {
                id: user === null || user === void 0 ? void 0 : user.id,
                username: user === null || user === void 0 ? void 0 : user.username,
                email: user === null || user === void 0 ? void 0 : user.email,
                role: user === null || user === void 0 ? void 0 : user.role
            };
            return res.status(201).json({
                status: true,
                message: 'OK',
                data: resUser
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.register = register;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (JWT_SECRET === undefined) {
                throw new Error('JWT_SECRET is not defined');
            }
            let { email, password } = req.body;
            cekpw(password);
            console.log(req.body);
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'email and password are required!',
                    data: null
                });
            }
            let user = yield prisma.users.findFirst({ where: { email } });
            console.log(user);
            console.log(user === null || user === void 0 ? void 0 : user.password);
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email',
                    data: null
                });
            }
            const isPasswordCorrect = yield (0, bcrypt_1.compare)(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid password!',
                    data: null
                });
            }
            const resUser = {
                id: user === null || user === void 0 ? void 0 : user.id,
                username: user === null || user === void 0 ? void 0 : user.username,
                email: user === null || user === void 0 ? void 0 : user.email,
                role: user === null || user === void 0 ? void 0 : user.role
            };
            let token = jsonwebtoken_1.default.sign(resUser, JWT_SECRET);
            res.json({
                status: true,
                message: 'OK',
                data: Object.assign(Object.assign({}, resUser), { token })
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function cekpw(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.users.findFirst({ where: { email: "1010101010@gmail.com" } });
        if (user) {
            const isPasswordCorrect = yield (0, bcrypt_1.compare)(password, user.password);
            if (!isPasswordCorrect) {
                console.log(isPasswordCorrect);
            }
        }
    });
}
cekpw("1010101010");
