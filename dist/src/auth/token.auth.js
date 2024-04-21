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
exports.whoami = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = __importDefault(require("../model/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../utils/auth.util");
const { JWT_SECRET } = process.env;
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
            yield bcrypt_1.default.hash(password, 10).then((isMatch) => __awaiter(this, void 0, void 0, function* () {
                if (isMatch) {
                    console.log(password);
                    let user = yield users_model_1.default.createUser(username, email, password);
                    console.log(user === null || user === void 0 ? void 0 : user.password);
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
                else {
                    return res.status(500).json({
                        status: false,
                        message: 'Invalid',
                        data: "Internal server error"
                    });
                }
            }));
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
            let { email, password } = req.body;
            console.log(req.body);
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'email and password are required!',
                    data: null
                });
            }
            const user = yield prisma.users.findFirst({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email',
                    data: null
                });
            }
            const encryptedPassword = user.password;
            console.log(password, encryptedPassword);
            yield bcrypt_1.default.compare(password, encryptedPassword).then((isPasswordCorrect) => {
                console.log(isPasswordCorrect);
                if (isPasswordCorrect) {
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
                else {
                    if (!isPasswordCorrect) {
                        return res.status(400).json({
                            status: false,
                            message: 'invalid password!',
                            data: null
                        });
                    }
                }
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function whoami(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            res.json({
                status: true,
                message: 'OK',
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.whoami = whoami;
