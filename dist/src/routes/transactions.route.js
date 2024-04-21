"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const transactions_controller_1 = __importDefault(require("../controllers/transactions.controller"));
const auth_util_1 = require("../utils/auth.util");
const transactionRouter = express_1.default.Router();
transactionRouter.param('id', transactions_controller_1.default.checkId);
transactionRouter.get("/:id", auth_util_1.restrict, transactions_controller_1.default.getTransactionById);
transactionRouter.post("/", auth_util_1.restrict, auth_util_1.isAdmin, (req, res, next) => { req.body.role = 'ADMIN'; next(); }, [
    (0, express_validator_1.body)('source_account_id').notEmpty().withMessage('Source account ID is required').isNumeric().withMessage('Source account ID must be a number'),
    (0, express_validator_1.body)('destination_account_id').notEmpty().withMessage('Destination account ID is required').isNumeric().withMessage('Destination account ID must be a number'),
    (0, express_validator_1.body)('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number')
], transactions_controller_1.default.createTransactions);
transactionRouter.get("/", auth_util_1.restrict, transactions_controller_1.default.getAllTransactions);
exports.default = transactionRouter;
