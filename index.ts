import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from 'cors';

import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';

const file = fs.readFileSync('./api-docs.yaml', 'utf-8');
const swaggerDocument = YAML.parse(file);

const app : Express = express()

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

app.get("/helloworld", (req : Request, res : Response) => {
    res.json({
        message : "Hello World"
    })
})

import {accountRouter, userRouter, transactionRouter} from './src/routes/index'
import { login, register, whoami } from "./src/auth/token.auth";
import { restrict } from "./src/utils/auth.util";

app.get('/whoami', restrict, whoami);
app.post('/register', register);
app.post('/login', login);
app.use('/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1/accounts", accountRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/transactions", transactionRouter)

app.use((err : any , req : Request, res : Response, next : NextFunction) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

app.use((req : Request, res : Response, next : NextFunction) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});


export default app