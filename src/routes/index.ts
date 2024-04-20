import { body } from "express-validator";
import express, { Express } from "express";
import accountsController from "../controllers/accounts.controller";

const router = express.Router()

router.post("/accounts", [
    body('bank_name').notEmpty().withMessage('Bank name is required'),
    body('bank_account_number').notEmpty().withMessage('Bank account number is required'),
    body('balance').notEmpty().withMessage('Balance is required').isNumeric().withMessage('Balance must be a number'),
    body('user_id').notEmpty().withMessage('User ID is required')
], accountsController.createAccounts);

export default router