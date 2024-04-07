import express from 'express'
import {UsuarioController} from '../controllers/usuario.controller'

export const usuarioRouter = express.Router()

// GET ALL
usuarioRouter.get('/', UsuarioController.getUsuarios)

// GET EMAIL
usuarioRouter.get('/:email', UsuarioController.getUsuario)

// POST
usuarioRouter.post('/', UsuarioController.postUsuario)

// PUT
usuarioRouter.put('/:email', UsuarioController.putUsuario)

// DELETE
usuarioRouter.delete('/:email', UsuarioController.deleteUsuario)