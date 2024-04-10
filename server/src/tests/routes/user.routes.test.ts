import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../../server/app'
import { configuraDB, desconectaDB } from '../../config/db.config'

describe('User API', () => {
    let mongoServer: MongoMemoryServer
    beforeEach(async () => {
        mongoServer = new MongoMemoryServer()
        await mongoServer.start()
        const mongoUri = await mongoServer.getUri()
        configuraDB(mongoUri)
    })

    afterEach(async () => {
        await desconectaDB();
        await mongoServer.stop()
    })

    describe('GET /users', () => {
        it('should return all users', async () => {
            const res = await request(app).get('/api/v1/usuarios')

            expect(res.status).toBe(200)
            
        })
    })
})