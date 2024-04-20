"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class User {
    constructor() {
    }
    createUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isEmail = yield prisma.users.findUnique({ where: { email } });
                const isUsername = yield prisma.users.findUnique({ where: { username } });
                if (isEmail || isUsername) {
                    return undefined;
                }
                const uuid = (0, uuid_1.v4)();
                const encryptedPassword = yield bcrypt.hash(password, 10);
                const user = yield prisma.users.create({
                    data: {
                        id: uuid,
                        username: username,
                        email: email,
                        password: encryptedPassword,
                        role: "user"
                    }
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.users.findUnique({ where: { username } });
                if (!user) {
                    return undefined;
                }
                return user;
            }
            catch (error) {
                console.error('Error while getting user by username:', error);
                throw error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.users.findMany();
                return users;
            }
            catch (error) {
                console.error('Error while getting all users:', error);
                throw error;
            }
        });
    }
    deleteUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield prisma.users.findUnique({ where: { username } });
                if (!exist) {
                    return undefined;
                }
                yield prisma.users.delete({ where: { username } });
                return exist;
            }
            catch (error) {
                console.error('Error while deleting user by username:', error);
                throw error;
            }
        });
    }
    updateUserByUsername(username, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield prisma.users.findUnique({ where: { username } });
                if (!exist) {
                    return undefined;
                }
                const updatedUser = yield prisma.users.update({
                    where: { username },
                    data: newData,
                });
                return updatedUser;
            }
            catch (error) {
                console.error('Error while updating user by username:', error);
                throw error;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.users.findUnique({ where: { id } });
                if (!user) {
                    return undefined;
                }
                return user;
            }
            catch (error) {
                console.error('Error while getting user by id:', error);
                throw error;
            }
        });
    }
}
exports.default = new User;
