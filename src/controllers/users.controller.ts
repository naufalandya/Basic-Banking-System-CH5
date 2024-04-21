import usersModel from "../model/users.model";
import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

class UsersController {
    constructor() {}

    async checkId (req: Request, res : Response, next: NextFunction): Promise<object | undefined> {

        try {
            const id = req.params.id
            const user = await usersModel.getUserById(id)

            if (!user){
                return res.status(404).json({
                    status : false,
                    message : `user with id ${id} is not exist`,
                    data : null
                })
            } else {
                next()
            }

        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async checkUsername (req: Request, res : Response, next: NextFunction): Promise<object | undefined> {

        try {
            const username = req.params.username
            const user = await usersModel.getUserByUsername(username)

            if (!user){
                return res.status(404).json({
                    status : false,
                    message : `user with username ${username} is not exist`,
                    data : null
                })
            } else {
                next()
            }

        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async createUsers(req: Request, res: Response, next: NextFunction): Promise<object> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
    
        try {
            const { username, email, password} = req.body;
    
            const newUser = await usersModel.createUser(username, email, password)
    
            if (!newUser) {
                return res.status(409).json({
                    status: false,
                    message: "Email or Username is already registered",
                    data: null
                });
            }

    
            const userData = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            };
    
            return res.status(201).json({
                status: true,
                message: "User successfully created",
                data: userData
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }
    
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<object> {
        try {
            const users = await usersModel.getAllUsers();
            const promises = users.map(async (user) => ({
                id: user.id,
                username : user.username,
                email : user.email,
                role : user.role
            }));
    
            const usersData = await Promise.all(promises);
    
            return res.status(200).json({
                status: true,
                message: "Users successfully fetched",
                data: usersData
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async getUserById(req: Request, res : Response, next: NextFunction): Promise<object> {
        try {
            const id = req.params.id
            const user = await usersModel.getUserById(id)

            if (!user){
                return res.status(404).json({
                    status : false,
                    message : `User with id ${id} is not exist`,
                    data : null
                })
            }

            const userData = {
                id: user.id,
                username : user.username,
                email : user.email,
                role : user.role
            };

            return res.status(201).json({
                status : true,
                message : "success",
                data : userData
            })

        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }


    async getUserByUsername(req: Request, res : Response, next: NextFunction): Promise<object> {
        try {
            const username = req.params.username
            const user = await usersModel.getUserByUsername(username)

            if (!user){
                return res.status(404).json({
                    status : false,
                    message : `User with username ${username} is not exist`,
                    data : null
                })
            }

            const userData = {
                id: user.id,
                username : user.username,
                email : user.email,
                role : user.role
            };

            return res.status(201).json({
                status : true,
                message : "success",
                data : userData
            })

        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async deleteUserByUsername(req: Request, res : Response, next: NextFunction): Promise<object> {
        try {
            const username = req.params.username
            const user = await usersModel.deleteUserByUsername(username)

            if (!user){
                return res.status(404).json({
                    status : false,
                    message : `User with username ${username} is not exist`,
                    data : null
                })
            }

            const userData = {
                id: user.id,
                username : user.username,
                email : user.email,
                role : user.role
            };

            return res.status(201).json({
                status : true,
                message : "success",
                data : userData
            })

        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }
    
}

export default new UsersController