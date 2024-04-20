import { PrismaClient, Accounts } from '@prisma/client';

const prisma = new PrismaClient();

class Account {
    constructor(){
    }

    async createAccount(bankName: string, bankAccountNumber: bigint, balance: bigint, userId: string): Promise<Accounts | undefined> {
        try {

            const exist = await prisma.accounts.findUnique({ where: { bank_account_number : bankAccountNumber } });

            if (exist) {
                return undefined
            }
            
            const account = await prisma.accounts.create({
                data: {
                    bank_name: bankName,
                    bank_account_number: bankAccountNumber,
                    balance: balance,
                    userID: userId
                }
            });

            return account;
        } catch (error) {
        console.log(error)
            throw error;
        }
    }

    async  getAllAccounts(): Promise<Accounts[]> {
        try {
            const accounts = await prisma.accounts.findMany();
            return accounts;
        } catch (error) {
            throw error;
        }
    }

    async  getAccountById(accountId: number): Promise<Accounts | undefined> {
        try {
            const account = await prisma.accounts.findUnique({ where: { id: accountId } });

            if(!account){
                return undefined
            }

            return account;
        } catch (error) {
            throw error;
        }
    }

    async  deleteAccount(accountId: number): Promise<Accounts | undefined> {
        try {
            const account = await prisma.accounts.findUnique({ where: { id: accountId } });

            if(!account){
                return undefined
            }

            await prisma.accounts.delete({ where: { id: accountId } });

            return account
        } catch (error) {
            throw error;
        }
    }

    async  updateAccount(accountId: number, newData: Partial<Accounts>): Promise<Accounts | undefined> {
        try {
            const account = await prisma.accounts.findUnique({ where: { id: accountId } });

            if(!account){
                return undefined
            }

            const updatedAccount = await prisma.accounts.update({
                where: { id: accountId },
                data: newData
            });
            return updatedAccount;
        } catch (error) {
            throw error;
        }
    }


}

export default new Account
