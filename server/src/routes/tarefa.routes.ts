import express from 'express'
import { TarefaController } from '../controllers/tarefa.controller'

export const tarefaRouter = express.Router()

// GET ALL
tarefaRouter.get('/', TarefaController.getTarefas)

// GET ID
//tarefaRouter.get('/:id', TarefaController.getTarefa)

// GET ALL EMAIL
tarefaRouter.get('/email/:usuarioEmail', TarefaController.getTarefasEmail)

// POST
tarefaRouter.post('/', TarefaController.postTarefa)

// PUT
//tarefaRouter.put('/:id', TarefaController.putTarefa)

// DELETE
//tarefaRouter.delete('/:id', TarefaController.deleteTarefa)