import { body } from "express-validator";
import express, { Express, Router } from "express";
import transactionsController from "../controllers/transactions.controller";

const transactionRouter : Router = express.Router()

transactionRouter.param('id', transactionsController.checkId)

transactionRouter.get("/:id", transactionsController.getTransactionById)

transactionRouter.post("/", [
    body('source_account_id').notEmpty().withMessage('Source account ID is required').isNumeric().withMessage('Source account ID must be a number'),
    body('destination_account_id').notEmpty().withMessage('Destination account ID is required').isNumeric().withMessage('Destination account ID must be a number'),
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number')
], transactionsController.createTransactions);

transactionRouter.get("/", transactionsController.getAllTransactions);

export default transactionRouter;
