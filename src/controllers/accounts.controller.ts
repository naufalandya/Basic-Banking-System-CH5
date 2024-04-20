import accountsModel from "../model/accounts.model";
import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

class AccountsController {
    constructor() {}

    async createAccounts(req : Request, res : Response , next : NextFunction) : Promise<object | undefined> {

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
}

export default new AccountsController