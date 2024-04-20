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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Account {
    constructor() {
    }
    createAccount(bankName, bankAccountNumber, balance, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield prisma.accounts.findUnique({ where: { bank_account_number: bankAccountNumber } });
                if (exist) {
                    return undefined;
                }
                const account = yield prisma.accounts.create({
                    data: {
                        bank_name: bankName,
                        bank_account_number: bankAccountNumber,
                        balance: balance,
                        userID: userId
                    }
                });
                return account;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield prisma.accounts.findMany();
                return accounts;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAccountById(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield prisma.accounts.findUnique({ where: { id: accountId } });
                if (!account) {
                    return undefined;
                }
                return account;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAccount(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield prisma.accounts.findUnique({ where: { id: accountId } });
                if (!account) {
                    return undefined;
                }
                yield prisma.accounts.delete({ where: { id: accountId } });
                return account;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateAccount(accountId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield prisma.accounts.findUnique({ where: { id: accountId } });
                if (!account) {
                    return undefined;
                }
                const updatedAccount = yield prisma.accounts.update({
                    where: { id: accountId },
                    data: newData
                });
                return updatedAccount;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new Account;
