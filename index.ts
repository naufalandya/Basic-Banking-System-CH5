import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";

const app : Express = express()


app.use(morgan('dev'))
app.use(express.json())

app.get("/helloworld", (req : Request, res : Response) => {
    res.json({
        message : "Hello World"
    })
})

import apiRouter from './src/routes/index'

app.use("/api/v1", apiRouter)

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