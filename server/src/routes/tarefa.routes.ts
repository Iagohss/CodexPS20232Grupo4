import express from 'express'
import { TarefaController } from '../controllers/tarefa.controller'

export const tarefaRouter = express.Router()

// GET ALL
tarefaRouter.get('/', TarefaController.getTarefas)

// GET ID
//usuarioRouter.get('/:id', TarefaController.getTarefa)

// POST
tarefaRouter.post('/', TarefaController.postTarefa)

// PUT
//usuarioRouter.put('/:id', TarefaController.putTarefa)

// DELETE
//usuarioRouter.delete('/:id', TarefaController.deleteTarefa)