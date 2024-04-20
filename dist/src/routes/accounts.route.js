"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const accounts_controller_1 = __importDefault(require("../controllers/accounts.controller"));
const accountRouter = express_1.default.Router();
accountRouter.param('id', accounts_controller_1.default.checkId);
accountRouter.get("/:id", accounts_controller_1.default.getAccountById);
accountRouter.post("/", [
    (0, express_validator_1.body)('bank_name').notEmpty().withMessage('Bank name is required'),
    (0, express_validator_1.body)('bank_account_number').notEmpty().withMessage('Bank account number is required'),
    (0, express_validator_1.body)('balance').notEmpty().withMessage('Balance is required').isNumeric().withMessage('Balance must be a number'),
    (0, express_validator_1.body)('user_id').notEmpty().withMessage('User ID is required')
], accounts_controller_1.default.createAccounts);
accountRouter.get("/", accounts_controller_1.default.getAllAccounts);
exports.default = accountRouter;
