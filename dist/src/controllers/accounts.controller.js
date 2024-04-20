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
const accounts_model_1 = __importDefault(require("../model/accounts.model"));
const express_validator_1 = require("express-validator");
class AccountsController {
    constructor() { }
    checkId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const account = yield accounts_model_1.default.getAccountById(id);
                if (!account) {
                    return res.status(404).json({
                        status: false,
                        message: `Account with id ${id} is not exist`,
                        data: null
                    });
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.error("Error fetching account:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    createAccounts(req, res, next) {
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
                const { bank_name, bank_account_number, balance, user_id } = req.body;
                const account = yield accounts_model_1.default.createAccount(bank_name, bank_account_number, balance, user_id);
                console.log(account);
                if (!account) {
                    return res.status(409).json({
                        status: false,
                        message: "bank account number is already registered",
                        data: null
                    });
                }
                const accountData = {
                    id: account.id,
                    bank_name: account.bank_name,
                    bank_account_number: account.bank_account_number.toString(),
                    balance: account.balance.toString(),
                    userID: account.userID
                };
                return res.status(201).json({
                    status: true,
                    message: "account successfully created",
                    data: accountData
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: false,
                    message: "internal server error",
                    data: null
                });
            }
        });
    }
    getAllAccounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield accounts_model_1.default.getAllAccounts();
                const promises = accounts.map((account) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        id: account.id,
                        bank_name: account.bank_name,
                        bank_account_number: account.bank_account_number.toString(),
                        balance: account.balance.toString(),
                        userID: account.userID
                    });
                }));
                const accountData = yield Promise.all(promises);
                return res.status(200).json({
                    status: true,
                    message: "Accounts successfully fetched",
                    data: accountData
                });
            }
            catch (error) {
                console.error("Error fetching accounts:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
    getAccountById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const account = yield accounts_model_1.default.getAccountById(id);
                if (!account) {
                    return res.status(404).json({
                        status: false,
                        message: `Account with id ${id} is not exist`,
                        data: null
                    });
                }
                const accountData = {
                    id: account.id,
                    bank_name: account.bank_name,
                    bank_account_number: account.bank_account_number.toString(),
                    balance: account.balance.toString(),
                    userID: account.userID
                };
                return res.status(201).json({
                    status: true,
                    message: "success",
                    data: accountData
                });
            }
            catch (error) {
                console.error("Error fetching account:", error);
                return res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    data: null
                });
            }
        });
    }
}
exports.default = new AccountsController;
