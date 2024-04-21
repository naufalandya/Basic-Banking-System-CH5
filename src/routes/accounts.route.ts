import { body } from "express-validator";
import express, { Express, NextFunction, Router, Request, Response } from "express";
import accountsController from "../controllers/accounts.controller";

import { isAdmin, restrict } from "../utils/auth.util";
import { whoami } from "../auth/token.auth";

const accountRouter : Router = express.Router()

accountRouter.param('id', accountsController.checkId)

accountRouter.get("/:id", restrict, accountsController.getAccountById)

accountRouter.post("/", restrict, isAdmin, (req : Request, res : Response, next : NextFunction) => { req.body.role = 'ADMIN'; next(); }, [
    body('bank_name').notEmpty().withMessage('Bank name is required'),
    body('bank_account_number').notEmpty().withMessage('Bank account number is required'),
    body('balance').notEmpty().withMessage('Balance is required').isNumeric().withMessage('Balance must be a number'),
    body('user_id').notEmpty().withMessage('User ID is required')
], accountsController.createAccounts);

accountRouter.get("/", restrict, accountsController.getAllAccounts);


export default accountRouter