"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
const supertest_1 = __importDefault(require("supertest"));
describe('POST /api/v1/users', () => {
    const agent = (0, supertest_1.default)(index_1.default);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield agent.delete('/api/v1/users/newuser');
    }));
    /*
        it('should delete an existing user', async () => {
            const usernameToDelete = 'newuser';
    
            const response: any = await agent
                .delete(`/api/v1/users/${usernameToDelete}`);
    
            console.log(response.body.data)
    
            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toBeNull();
        });
    */
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: 'newuser',
            email: 'newuser@example.com',
            password: 'password',
        };
        const response = yield agent
            .post('/api/v1/users')
            .send(userData);
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('User successfully created');
        expect(response.body.data).toBeDefined();
    }));
    it('email or username is already registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUserData = {
            username: 'existinguser',
            email: 'newuser@example.com',
            password: 'password',
        };
        const response = yield agent
            .post('/api/v1/users')
            .send(existingUserData);
        expect(response.status).toBe(409);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Email or Username is already registered');
        expect(response.body.data).toBeNull();
    }));
    it('email or username is already registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: 'newuser',
            email: 'anewuser@example.com',
            password: 'password',
        };
        const response = yield agent
            .post('/api/v1/users')
            .send(userData);
        console.log(response.body);
        expect(response.status).toBe(409);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Email or Username is already registered');
        expect(response.body.data).toBeNull();
    }));
});
