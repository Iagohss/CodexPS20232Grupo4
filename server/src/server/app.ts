import express, { Application } from 'express';
import cors from 'cors';
import { usuarioRouter } from '../routes/usuario.routes';
import { tarefaRouter } from '../routes/tarefa.routes';

const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Rotas
app.use('/api/v1/usuarios', usuarioRouter)
app.use('/api/v1/tarefas', tarefaRouter)

export default app