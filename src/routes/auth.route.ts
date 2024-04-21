import express, { Express } from "express";
import { login, register } from "../auth/token.auth";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter