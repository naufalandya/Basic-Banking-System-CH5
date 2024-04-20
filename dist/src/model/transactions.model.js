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
class Trensaction {
    constructor() { }
    createTransaction(sourceAccountId, destinationAccountId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceAccount = yield prisma.accounts.findUnique({ where: { id: sourceAccountId } });
                const destinationAccount = yield prisma.accounts.findUnique({ where: { id: destinationAccountId } });
                if (!sourceAccount || !destinationAccount) {
                    return undefined;
                }
                const transaction = yield prisma.transactions.create({
                    data: {
                        source_account_id: sourceAccountId,
                        destination_account_id: destinationAccountId,
                        amount: amount
                    }
                });
                return transaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield prisma.transactions.findMany();
                return transactions;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield prisma.transactions.findUnique({ where: { id: transactionId } });
                if (!transaction) {
                    return undefined;
                }
                return transaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield prisma.transactions.findUnique({ where: { id: transactionId } });
                if (!exist) {
                    return undefined;
                }
                yield prisma.transactions.delete({ where: { id: transactionId } });
                return exist;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateTransaction(transactionId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield prisma.transactions.findUnique({ where: { id: transactionId } });
                if (!exist) {
                    return undefined;
                }
                const updatedTransaction = yield prisma.transactions.update({
                    where: { id: transactionId },
                    data: newData
                });
                return updatedTransaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new Trensaction;
