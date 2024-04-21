"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const auth_util_1 = require("../utils/auth.util");
const userRouter = express_1.default.Router();
userRouter.param('username', users_controller_1.default.checkUsername);
userRouter.get("/:username", auth_util_1.restrict, users_controller_1.default.checkUsername, users_controller_1.default.getUserByUsername);
userRouter.delete("/:username", auth_util_1.restrict, users_controller_1.default.deleteUserByUsername);
userRouter.post("/", auth_util_1.restrict, auth_util_1.isAdmin, (req, res, next) => { req.body.role = 'ADMIN'; next(); }, [
    (0, express_validator_1.body)('username').notEmpty().withMessage('Username is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
], users_controller_1.default.createUsers);
userRouter.get("/", auth_util_1.restrict, users_controller_1.default.getAllUsers);
exports.default = userRouter;
