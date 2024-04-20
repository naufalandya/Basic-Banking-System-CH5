"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = exports.userRouter = exports.accountRouter = void 0;
const accounts_route_1 = __importDefault(require("./accounts.route"));
exports.accountRouter = accounts_route_1.default;
const users_route_1 = __importDefault(require("./users.route"));
exports.userRouter = users_route_1.default;
const transactions_route_1 = __importDefault(require("./transactions.route"));
exports.transactionRouter = transactions_route_1.default;
