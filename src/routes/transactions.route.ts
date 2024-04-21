import { body } from "express-validator";
import express, { Express, NextFunction, Router, Request, Response } from "express";
import transactionsController from "../controllers/transactions.controller";

import { isAdmin, restrict } from "../utils/auth.util";
import { whoami } from "../auth/token.auth";

const transactionRouter : Router = express.Router()

transactionRouter.param('id', transactionsController.checkId)

transactionRouter.get("/:id", restrict, transactionsController.getTransactionById)

transactionRouter.post("/", restrict, isAdmin, (req : Request, res : Response, next : NextFunction) => { req.body.role = 'ADMIN'; next(); }, [
    body('source_account_id').notEmpty().withMessage('Source account ID is required').isNumeric().withMessage('Source account ID must be a number'),
    body('destination_account_id').notEmpty().withMessage('Destination account ID is required').isNumeric().withMessage('Destination account ID must be a number'),
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number')
], transactionsController.createTransactions);

transactionRouter.get("/", restrict, transactionsController.getAllTransactions);

export default transactionRouter;
