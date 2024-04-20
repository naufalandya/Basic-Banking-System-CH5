import { body } from "express-validator";
import express, { Express, Router } from "express";
import usersController from "../controllers/users.controller";

const userRouter : Router = express.Router()

userRouter.param('id', usersController.checkId)

userRouter.get("/:id", usersController.getUserById)

userRouter.post("/", [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
], usersController.createUsers);

userRouter.get("/", usersController.getAllUsers);

export default userRouter