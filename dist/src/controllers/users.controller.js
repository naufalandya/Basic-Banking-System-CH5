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
const users_model_1 = __importDefault(require("../model/users.model"));
const express_validator_1 = require("express-validator");
class UsersController {
    constructor() { }
    checkId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield users_model_1.default.getUserById(id);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: `user with id ${id} is not exist`,
                        data: null
                    });
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    checkUsername(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                const user = yield users_model_1.default.getUserByUsername(username);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: `user with username ${username} is not exist`,
                        data: null
                    });
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    createUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: "Validation failed",
                    errors: errors.array()
                });
            }
            try {
                const { username, email, password } = req.body;
                const newUser = yield users_model_1.default.createUser(username, email, password);
                if (!newUser) {
                    return res.status(409).json({
                        status: false,
                        message: "Email or Username is already registered",
                        data: null
                    });
                }
                const userData = {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                };
                return res.status(201).json({
                    status: true,
                    message: "User successfully created",
                    data: userData
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield users_model_1.default.getAllUsers();
                const promises = users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    });
                }));
                const usersData = yield Promise.all(promises);
                return res.status(200).json({
                    status: true,
                    message: "Users successfully fetched",
                    data: usersData
                });
            }
            catch (error) {
                console.error("Error fetching users:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield users_model_1.default.getUserById(id);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: `User with id ${id} is not exist`,
                        data: null
                    });
                }
                const userData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                return res.status(201).json({
                    status: true,
                    message: "success",
                    data: userData
                });
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    getUserByUsername(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                const user = yield users_model_1.default.getUserByUsername(username);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: `User with username ${username} is not exist`,
                        data: null
                    });
                }
                const userData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                return res.status(201).json({
                    status: true,
                    message: "success",
                    data: userData
                });
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    deleteUserByUsername(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                const user = yield users_model_1.default.deleteUserByUsername(username);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: `User with username ${username} is not exist`,
                        data: null
                    });
                }
                const userData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                return res.status(201).json({
                    status: true,
                    message: "success",
                    data: userData
                });
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
}
exports.default = new UsersController;
