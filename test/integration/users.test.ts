import app from '../../index';
import supertest, {SuperTest, Test} from 'supertest'

describe('POST /api/v1/users', () => {
    const agent: any = supertest(app) as unknown as SuperTest<Test>;

    beforeAll(async () => {
        await agent.delete('/api/v1/users/newuser');
    });
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
    it('should create a new user', async () => {
        const userData = {
            username: 'newuser',
            email: 'newuser@example.com',
            password: 'password',
        };

        const response : any = await agent
            .post('/api/v1/users')
            .send(userData)
            console.log(response.body)

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('User successfully created');
        expect(response.body.data).toBeDefined();
    });

    it('email or username is already registered', async () => {
        const existingUserData = {
            username: 'existinguser',
            email: 'newuser@example.com',
            password: 'password',
        };

        const response : any = await agent
            .post('/api/v1/users')
            .send(existingUserData);

        expect(response.status).toBe(409);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Email or Username is already registered');
        expect(response.body.data).toBeNull();
    });

    it('email or username is already registered', async () => {

        const userData = {
            username: 'newuser',
            email: 'anewuser@example.com',
            password: 'password',
        };

        const response : any = await agent
            .post('/api/v1/users')
            .send(userData);

            console.log(response.body)
        expect(response.status).toBe(409);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Email or Username is already registered');
        expect(response.body.data).toBeNull();
    });
});