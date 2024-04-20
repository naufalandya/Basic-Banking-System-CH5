import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt';

const prisma : PrismaClient = new PrismaClient();


class User {
    constructor(){

    }

    async createUser(username : string , email : string , password : string, role : string): Promise<object | undefined>{
     try {

        const exist = await prisma.users.findUnique({ where: { email } });

        if (exist) {
            return undefined
        }

        const uuid : string = uuidv4();
        const encryptedPassword : string = await bcrypt.hash(password, 10)
        const user : object = await prisma.users.create({

            data : {
                id: uuid,
                username: username,
                email: email,
                password: encryptedPassword,
                role : "user"
            }
        });

        return user

     } catch (error) {
        throw error
     } 
    }

    async getUserByUsername(username: string): Promise<object | undefined> {
        try {
            // Cari pengguna berdasarkan username
            const user = await prisma.users.findUnique({ where: { username } });

            if(!user){
                return undefined
            }

            return user;

        } catch (error) {
            console.error('Error while getting user by username:', error);
            throw error;
        }
    }

    async getAllUsers(): Promise<object[]> {
        try {

            const users = await prisma.users.findMany();
            return users;
        } catch (error) {
            console.error('Error while getting all users:', error);
            throw error;
        }
    }

    async deleteUserByUsername(username: string): Promise<void> {
        try {

            await prisma.users.delete({ where: { username } });
        } catch (error) {
            console.error('Error while deleting user by username:', error);
            throw error;
        }
    }

    async updateUserByUsername(username: string, newData: any): Promise<object | undefined> {
        try {

            const updatedUser = await prisma.users.update({
                where: { username },
                data: newData,
            });

            return updatedUser;

        } catch (error) {
            console.error('Error while updating user by username:', error);
            throw error;
        }
    }

    async getUserById(id: string): Promise<object | undefined> {
        try {
            // Cari pengguna berdasarkan username
            const user = await prisma.users.findUnique({ where: { id } });

            if(!user){
                return undefined
            }

            return user;

        } catch (error) {
            console.error('Error while getting user by id:', error);
            throw error;
        }
    }
}

export default new User