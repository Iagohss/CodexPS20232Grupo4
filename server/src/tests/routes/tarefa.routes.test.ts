import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createMongoMemoryServer, stopMongoMemoryServer } from '../../utils/tests/mongomemoryserver.utils' 
import { addTarefas } from '../../utils/tests/tarefa.routes.test.utils'
import { addUsuarios } from '../../utils/tests/usuario.routes.test.utils'

import app from '../../server/app'


describe('Rotas de Tarefas', () => {
    let mongoServer: MongoMemoryServer
    let usuarioEmail: string

    describe('GET ALL /tarefas', () => {

        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
            const [usuario] = await addUsuarios(1)
            usuarioEmail = usuario.email
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })

        it('retorna todas as tarefas', async () => {

            await addTarefas(usuarioEmail, 2)

            let res = await request(app).get('/api/v1/tarefas')

            expect(res.body.length).toBe(2)
            expect(res.status).toBe(200)
        })
    })

    describe('GET ALL EMAIL /tarefas/email/:email/:senha', () => {
        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
            const [usuario] = await addUsuarios(1)
            usuarioEmail = usuario.email
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })

        it('dá erro se email não existe', async () => {

            const res = await request(app).get('/api/v1/tarefas/email/naoexiste@email.com/senhaqualquer')

            expect(res.status).toBe(404)
        })

        it('dá erro se a senha não bate', async () => {

            const res = await request(app).get(`/api/v1/tarefas/email/${usuarioEmail}/senhaqualquer`)

            expect(res.status).toBe(401)
            const message = res.body
            expect(message).toBe('Senha do usuário incorreta.')
        })

        it('retorna todas se a senha está correta', async () => {

            await addTarefas(usuarioEmail, 2)

            const res = await request(app).get(`/api/v1/tarefas/email/${usuarioEmail}/senha1`)

            expect(res.body.length).toBe(2)
            expect(res.status).toBe(200)
        })
        
        
    })
    

})