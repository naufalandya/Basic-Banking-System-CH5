import transactionsModel from "../model/transactions.model";
import { Request, Response, NextFunction } from "express";
import { Transactions } from '@prisma/client';

class TransactionsController{
    constructor(){}

    async checkId (req: Request, res : Response, next: NextFunction): Promise<object | undefined> {

        try {
            const id = Number(req.params.id)
            const user = await transactionsModel.getTransactionById(id)

            if (!user){
                return res.status(404).json({
                    status : false,
                    message : `transaction with id ${id} is not exist`,
                    data : null
                })
            } else {
                next()
            }

        } catch (error) {
            console.error("Error fetching transaction:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }
    
    async createTransactions(req: Request, res: Response): Promise<object> {
        const { source_account_id, destination_account_id, amount } = req.body;
    
        try {
            const transaction = await transactionsModel.createTransaction(source_account_id, destination_account_id, amount);
            
            if (!transaction) {
                return res.status(400).json({ error: 'Failed to create transaction. Source or destination account not found.' });
            }
    
            return res.status(201).json({
                status : true,
                message : "success",
                data : transaction
            })
        } catch (error) {
            console.error('Error creating transaction:', error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async getAllTransactions(req: Request, res: Response, next: NextFunction): Promise<object> {
        try {
            const transactions = await transactionsModel.getAllTransactions();
            const promises = transactions.map(async (transaction) => ({
                source_account_id: transaction.source_account_id,
                destination_account_id: transaction.destination_account_id,
                amount: transaction.amount
            }));
    
            const transactionsData = await Promise.all(promises);
    
            return res.status(200).json({
                status: true,
                message: "Transactions successfully fetched",
                data: transactionsData
            });

        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }
}

export default new TransactionsController