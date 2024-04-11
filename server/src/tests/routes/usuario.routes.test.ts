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

            res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)

            expect(res.status).toBe(400)
            const erro = JSON.parse(res.body)
            expect(erro.message).toBe('Usuário não pôde ser criado.')
        })

        describe('Campos inválidos', () => {
            it('dá erro se o email é inválido', async () => {
                const usuarioBody = {
                    email: 'nao_eh_email',
                    primeiroNome: 'Usuario',
                    restoNome: '1',
                    dataNascimento: '1990-01-01',
                    genero: 'Masculino',
                    senha: 'senhateste'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)

                expect(res.status).toBe(400)
                const [message] = res.body
                expect(message).toBe('email inválido(a)')
            })

            it('dá erro se a data de nascimento é inválida', async () => {
                const usuarioBody = {
                    email: 'teste@email.com',
                    primeiroNome: 'Usuario',
                    restoNome: '1',
                    dataNascimento: "dia da mentira",
                    genero: 'Masculino',
                    senha: 'senhateste'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
                expect(res.status).toBe(400)
                const [message] = res.body
                expect(message).toBe('dataNascimento inválido(a)')
            })

            it('dá erro se o primeiroNome é inválido', async () => {
                const usuarioBody = {
                    email: 'teste@email.com',
                    restoNome: '1',
                    dataNascimento: "dia da mentira",
                    genero: 'Masculino',
                    senha: 'senhateste'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
                expect(res.status).toBe(400)
                const [message] = res.body
                expect(message).toBe('primeiroNome inválido(a)')
            })

            it('dá erro se o restoNome é inválido', async () => {
                const usuarioBody = {
                    email: 'teste@email.com',
                    primeiroNome: 'Usuario',
                    dataNascimento: '1990-01-01',
                    genero: 'Masculino',
                    senha: 'senhateste'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
                expect(res.status).toBe(400)
                const [message] = res.body
                expect(message).toBe('restoNome inválido(a)')
            })

            it('dá erro se o genero é inválido', async () => {
                const usuarioBody = {
                    email: 'teste@email.com',
                    primeiroNome: 'Usuario',
                    restoNome: '1',
                    dataNascimento: '1990-01-01',
                    senha: 'senhateste'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
                expect(res.status).toBe(400)
                const [message] = res.body
                expect(message).toBe('genero inválido(a)')
            })

            it('dá erro se a senha é inválida', async () => {
                const usuarioBody = {
                    email: 'teste@email.com',
                    primeiroNome: 'Usuario',
                    restoNome: '1',
                    dataNascimento: '1990-01-01',
                    genero: 'Masculino'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
                expect(res.status).toBe(400)
                const [message] = res.body
                expect(message).toBe('senha inválido(a)')
            })

            it('dá certo se todos os campos são válidos', async () => {
                const usuarioBody = {
                    email: 'teste@email.com',
                    primeiroNome: 'Usuario',
                    restoNome: '1',
                    dataNascimento: '1990-01-01',
                    genero: 'Masculino',
                    senha: 'senhateste'
                }

                const res = await request(app).post(`/api/v1/usuarios`).send(usuarioBody)
                expect(res.status).toBe(201)
            })

            
        })
   

    })

    describe('PUT /usuarios/:email', () => {
        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })

        it('dá erro se email não existe', async () => {
            
            const usuarioBody = {
                primeiroNome: 'Usuario',
                restoNome: '1',
                dataNascimento: '1990-01-01',
                genero: 'Masculino',
                senhaAntiga: 'senhateste',
                senhaNova: 'outrasenha'
            }

            const res = await request(app).put('/api/v1/usuarios/naoexiste@email.com').send(usuarioBody)

            expect(res.status).toBe(404)
            const message = res.body
            expect(message).toBe('O usuário não existe.')
        })

        it('dá erro se a senha não bate', async () => {
            const [usuario] = await addUsuarios(1)

            const usuarioBody = {
                primeiroNome: 'Usuario',
                restoNome: '1',
                dataNascimento: '1990-01-01',
                genero: 'Masculino',
                senhaAntiga: 'senhaerrada',
                senhaNova: 'outrasenha'
            }

            const res = await request(app).put(`/api/v1/usuarios/${usuario.email}`).send(usuarioBody);

            expect(res.status).toBe(401);
            const message = res.body
            expect(message).toBe('Senha do usuário inválida.')
        })

        it('modifica o Usuário se todos os campos forem válidos', async () => {

            const [usuario] = await addUsuarios(1)

            const usuarioBody = {
                primeiroNome: 'Usuario',
                restoNome: '1',
                dataNascimento: '1990-01-01',
                genero: 'Masculino',
                senhaAntiga: usuario.senha,
                senhaNova: 'outrasenha'
            }
            
            const res = await request(app).put(`/api/v1/usuarios/${usuario.email}`).send(usuarioBody)
            const body = res.body._data

            expect(res.status).toBe(200)

            expect(body.primeiroNome).toBe(usuarioBody.primeiroNome)
            expect(body.restoNome).toBe(usuarioBody.restoNome)
            expect(JSON.stringify(body.dataNascimento)).toBe(JSON.stringify(new Date(usuarioBody.dataNascimento)))
            expect(body.genero).toBe(usuarioBody.genero)
        })
    })

    describe('DELETE /usuarios/', () => {
        beforeEach(async () => {
            mongoServer = await createMongoMemoryServer()
        })
    
        afterEach(async () => {
            await stopMongoMemoryServer(mongoServer)
        })

        it('dá erro se email não existe', async () => {
            
            const body = {
                senha: 'senha'
            }

            const res = await request(app).delete('/api/v1/usuarios/nao@existe.com').send(body)

            expect(res.status).toBe(404)
            const message = res.body
            expect(message).toBe('O usuário não existe.')
        })

        it('dá erro se a senha não bate', async () => {
            const [usuario] = await addUsuarios(1)

            const body = {
                senha: 'senhaerrada',
            }

            const res = await request(app).delete(`/api/v1/usuarios/${usuario.email}`).send(body)

            expect(res.status).toBe(401)
            const message = res.body
            expect(message).toBe('Senha do usuário inválida.')
        })

        it('deleta o Usuário se todos os campos forem válidos', async () => {

            const [usuario] = await addUsuarios(1)

            const body = {
                senha: usuario.senha
            }

            const res = await request(app).delete(`/api/v1/usuarios/${usuario.email}`).send(body)

            expect(res.status).toBe(204)
            expect(res.body).toEqual({})
        })
    })
        

})
