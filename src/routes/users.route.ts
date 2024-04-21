import { body } from "express-validator";
import express, { Express, NextFunction, Router, Request, Response } from "express";
import usersController from "../controllers/users.controller";

import { isAdmin, restrict } from "../utils/auth.util";
import { whoami } from "../auth/token.auth";

const userRouter : Router = express.Router()

userRouter.param('username', usersController.checkUsername)

userRouter.get("/:username", restrict, usersController.checkUsername, usersController.getUserByUsername)

userRouter.delete("/:username", restrict, usersController.deleteUserByUsername);

userRouter.post("/", restrict, isAdmin, (req : Request, res : Response, next : NextFunction) => { req.body.role = 'ADMIN'; next(); }, [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
], usersController.createUsers);

userRouter.get("/", restrict, usersController.getAllUsers);


export default userRouter