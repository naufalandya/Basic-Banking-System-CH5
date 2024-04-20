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
const transactions_model_1 = __importDefault(require("../model/transactions.model"));
const express_validator_1 = require("express-validator");
class TransactionsController {
    constructor() { }
    checkId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const user = yield transactions_model_1.default.getTransactionById(id);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: `transaction with id ${id} is not exist`,
                        data: null
                    });
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.error("Error fetching transaction:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    createTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: "Validation failed",
                    errors: errors.array()
                });
            }
            const { source_account_id, destination_account_id, amount } = req.body;
            try {
                const transaction = yield transactions_model_1.default.createTransaction(source_account_id, destination_account_id, amount);
                if (!transaction) {
                    return res.status(400).json({ error: 'Failed to create transaction. Source or destination account not found.' });
                }
                return res.status(201).json({
                    status: true,
                    message: "success",
                    data: transaction
                });
            }
            catch (error) {
                console.error('Error creating transaction:', error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    getAllTransactions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactions_model_1.default.getAllTransactions();
                const promises = transactions.map((transaction) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        source_account_id: transaction.source_account_id,
                        destination_account_id: transaction.destination_account_id,
                        amount: transaction.amount
                    });
                }));
                const transactionsData = yield Promise.all(promises);
                return res.status(200).json({
                    status: true,
                    message: "Transactions successfully fetched",
                    data: transactionsData
                });
            }
            catch (error) {
                console.error("Error fetching transactions:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    getTransactionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const transaction = yield transactions_model_1.default.getTransactionById(id);
                if (!transaction) {
                    return res.status(404).json({
                        status: false,
                        message: `Transaction with id ${id} is not exist`,
                        data: null
                    });
                }
                const transactionData = {
                    source_account_id: transaction.source_account_id,
                    destination_account_id: transaction.destination_account_id,
                    amount: transaction.amount
                };
                return res.status(201).json({
                    status: true,
                    message: "success",
                    data: transactionData
                });
            }
            catch (error) {
                console.error("Error fetching transaction:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
}
exports.default = new TransactionsController;
