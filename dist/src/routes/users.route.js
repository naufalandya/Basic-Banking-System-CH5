"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const userRouter = express_1.default.Router();
userRouter.param('id', users_controller_1.default.checkId);
userRouter.get("/:id", users_controller_1.default.getUserById);
userRouter.post("/", [
    (0, express_validator_1.body)('username').notEmpty().withMessage('Username is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
], users_controller_1.default.createUsers);
userRouter.get("/", users_controller_1.default.getAllUsers);
exports.default = userRouter;
