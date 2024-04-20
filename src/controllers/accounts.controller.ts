import accountsModel from "../model/accounts.model";
import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

class AccountsController {
    constructor() {}

    async checkId (req: Request, res : Response, next: NextFunction): Promise<object | undefined> {

        try {
            const id = Number(req.params.id)
            const account = await accountsModel.getAccountById(id)

            if (!account){
                return res.status(404).json({
                    status : false,
                    message : `Account with id ${id} is not exist`,
                    data : null
                })
            } else {
                next()
            }

        } catch (error) {
            console.error("Error fetching account:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async createAccounts(req : Request, res : Response , next : NextFunction) : Promise<object> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        try {
            const { bank_name, bank_account_number, balance, user_id } = req.body
            const account = await accountsModel.createAccount(bank_name, bank_account_number, balance, user_id)
            
            console.log(account)

            if (!account){
                return res.status(409).json({
                    status : false,
                    message : "bank account number is already used",
                    data : null
                })
            }

            const accountData = {
                id: account.id,
                bank_name: account.bank_name,
                bank_account_number: account.bank_account_number.toString(),
                balance: account.balance.toString(),
                userID: account.userID
            };

            return res.status(201).json({
                status : true,
                message : "account successfully created",
                data : accountData
            })

        } catch (error){
            console.log(error)
            return res.status(500).json({
                status : false,
                message : "internal server error",
                data : null
            })
        }
    }

    async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<object> {
        try {
            const accounts = await accountsModel.getAllAccounts();
            const promises = accounts.map(async (account) => ({
                id: account.id,
                bank_name: account.bank_name,
                bank_account_number: account.bank_account_number.toString(),
                balance: account.balance.toString(),
                userID: account.userID
            }));
    
            const accountData = await Promise.all(promises);
    
            return res.status(200).json({
                status: true,
                message: "Accounts successfully fetched",
                data: accountData
            });
        } catch (error) {
            console.error("Error fetching accounts:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async getAccountById(req: Request, res : Response, next: NextFunction): Promise<object> {
        try {
            const id = Number(req.params.id)
            const account = await accountsModel.getAccountById(id)

            if (!account){
                return res.status(404).json({
                    status : false,
                    message : `Account with id ${id} is not exist`,
                    data : null
                })
            }

            const accountData = {
                id: account.id,
                bank_name: account.bank_name,
                bank_account_number: account.bank_account_number.toString(),
                balance: account.balance.toString(),
                userID: account.userID
            };

            return res.status(201).json({
                status : true,
                message : "success",
                data : accountData
            })

        } catch (error) {
            console.error("Error fetching account:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }
    
}

export default new AccountsController