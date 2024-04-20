import { PrismaClient, Transactions } from "@prisma/client";
const prisma : PrismaClient = new PrismaClient();

class Trensaction {
    constructor(){}

    async createTransaction(sourceAccountId: number, destinationAccountId: number, amount: number): Promise<object | undefined> {
        try {
            const sourceAccount = await prisma.accounts.findUnique({ where: { id: sourceAccountId } });
            const destinationAccount = await prisma.accounts.findUnique({ where: { id: destinationAccountId } });
    
            if (!sourceAccount || !destinationAccount) {
                return undefined; 
            }
    
            const transaction = await prisma.transactions.create({
                data: {
                    source_account_id: sourceAccountId,
                    destination_account_id: destinationAccountId,
                    amount: amount
                }
            });
    
            return transaction;
        } catch (error) {
            throw error;
        }
    }


    async getAllTransactions(): Promise<Transactions[]> {
        try {
            const transactions = await prisma.transactions.findMany();
            return transactions;
        } catch (error) {
            throw error;
        }
    }
    
    async getTransactionById(transactionId: number): Promise<Transactions | undefined> {
        try {
            const transaction = await prisma.transactions.findUnique({ where: { id: transactionId } });

            if(!transaction){
                return undefined
            }

            return transaction;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteTransaction(transactionId: number): Promise<Transactions | undefined > {
        try {
            const exist = await prisma.transactions.findUnique({ where: { id : transactionId } });

            if (!exist) {
                return undefined
            }

            await prisma.transactions.delete({ where: { id: transactionId } });

            return exist 

        } catch (error) {
            throw error;
        }
    }
    
    async updateTransaction(transactionId: number, newData: Partial<Transactions>): Promise<Transactions | undefined> {
        try {

            const exist = await prisma.transactions.findUnique({ where: { id : transactionId } });

            if (!exist) {
                return undefined
            }

            const updatedTransaction = await prisma.transactions.update({
                where: { id: transactionId },
                data: newData
            });
            
            return updatedTransaction;
        } catch (error) {
            throw error;
        }
    }
}

export default new Trensaction