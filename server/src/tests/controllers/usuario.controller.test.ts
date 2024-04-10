import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createMongoMemoryServer, stopMongoMemoryServer } from '../../utils/tests/mongomemoryserver.utils' 
import { addUsuarios } from '../../utils/tests/usuario.routes.test.utils'
import app from '../../server/app'

describe('Rotas de Usuario', () => {
    let mongoServer: MongoMemoryServer

    describe('GET ALL /usuarios', () => {

        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })

        it('retorna todos os usuários', async () => {

            let res = await request(app).get('/api/v1/usuarios')

            expect(res.body.length).toBe(0)
            expect(res.status).toBe(200)

            await addUsuarios(3)

            res = await request(app).get('/api/v1/usuarios')

            expect(res.body.length).toBe(3)
            expect(res.status).toBe(200)
        })
    })

    describe('GET EMAIL /usuarios/:email', () => {
        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })
        it('dá erro se email não existe', async () => {

            await addUsuarios(1)

            const res = await request(app).get('/api/v1/usuarios/naoexiste@email.com')

            expect(res.status).toBe(404)
        })
        it('retorna o usuário referente ao email', async () => {

            const [usuario] = await addUsuarios(2);
            
            const res = await request(app).get(`/api/v1/usuarios/${usuario.email}`);
            const body = res.body._data

            expect(res.status).toBe(200)

            expect(body.primeiroNome).toBe(usuario.primeiroNome)
            expect(body.restoNome).toBe(usuario.restoNome)
            expect(JSON.stringify(body.dataNascimento)).toBe(JSON.stringify(usuario.dataNascimento))
            expect(body.genero).toBe(usuario.genero)
            expect(body.email).toBe(usuario.email)
        })
        
    })

    describe('POST /usuarios', () => {
        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })

        it('dá erro se o email não é único', async () => {
            const usuarioBody = {
                email: 'teste@email.com',
                primeiroNome: 'Usuario',
                restoNome: '1',
                dataNascimento: '1990-01-01',
                genero: 'Masculino',
                senha: 'senhateste'
            }
    
            let res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)

            expect(res.status).toBe(201)
    
            let res2 = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
    
            expect(res2.status).toBe(400)
            expect(res2.body.message).toBe('O email já está em uso')
        })
    })

})
