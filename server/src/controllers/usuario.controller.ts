import {usuarioServices} from '../services/usuario.service'
import {Request, Response} from 'express'
import {usuarioSchemaValidate} from '../models/usuario'
import { putUsuarioSchemaValidate } from '../dto/usuario/putUsuario.dto'
import { deleteUsuarioSchemaValidate } from '../dto/usuario/deleteUsuario.dto'

import {ResponseError} from '../errors/ResponseError'

class usuarioController{

    // GET ALL
    getUsuarios = async (req: Request, res: Response) => {
        try{
            const usuarios = await usuarioServices.getUsuarios()
            res.send(usuarios)
        }catch(error: any){
            if (error instanceof ResponseError){
                res.status(error.codigoResposta).json(error.message);
            }
        }
    }

    // GET EMAIL
    getUsuario = async (req: Request, res: Response) => {
        try{
            const email = req.params.email
            const usuario = await usuarioServices.getUsuario(email)
            res.send(usuario)

        }catch(error: any){
            if (error instanceof ResponseError){
                res.status(error.codigoResposta).json(error.message)
            }else{
                res.status(500).send(error.message)
            }
        }
    }
    // POST
    postUsuario = async(req: Request, res: Response) =>{
        const dados = {
            email: req.body.email,
            primeiroNome: req.body.primeiroNome,
            restoNome: req.body.restoNome,
            dataNascimento: req.body.dataNascimento,
            genero: req.body.genero,
            senha: req.body.senha
        }
        
        const {error, value} = usuarioSchemaValidate.validate(dados, { stripUnknown: true })

        if (error){ // se a validação na aplicação falhar:
            const message = error.details.map(detail => detail.message);
            res.status(400).send(message) // TODO traduzir essas mensagens
        }else{ // a validação na aplicação deu certo, falta a do MongoDB:
            try{
                const usuario = await usuarioServices.postUsuario(value)
                res.status(201).send(usuario)

            }catch(error: any){ // se o MongoDB rejeitar
                if (error instanceof ResponseError){
                    res.status(error.codigoResposta).json(error.message)
                }else{
                    res.status(500).send()
                }
            }
            
        }
    }

    // PUT
    putUsuario = async(req: Request, res: Response) =>{
        const dados = {
            email: req.params.email,
            primeiroNome: req.body.primeiroNome,
            restoNome: req.body.restoNome,
            dataNascimento: req.body.dataNascimento,
            genero: req.body.genero,
            senhaAntiga: req.body.senhaAntiga,
            senhaNova: req.body.senhaNova
        }

        const {error, value} = putUsuarioSchemaValidate.validate(dados, { stripUnknown: true })

        if (error){ // se a validação na aplicação falhar:
            const message = error.details[0].message;
            res.status(400).send(message) // TODO traduzir essas mensagens
        }else{ // a validação na aplicação deu certo, falta a do MongoDB:
            try{
                const usuario = await usuarioServices.putUsuario(value)
                res.status(201).send(usuario) // TODO dto

            }catch(error: any){ // se o MongoDB rejeitar
                if (error instanceof ResponseError){
                    res.status(error.codigoResposta).json(error.message)
                }else{
                    res.status(500).send()
                }
            }
            
        }
    }

    // DELETE
    deleteUsuario = async(req: Request, res: Response) =>{
        const dados = {
            email: req.params.email,
            senha: req.body.senha
        }

        const {error, value} = deleteUsuarioSchemaValidate.validate(dados, { stripUnknown: true })

        if (error){ // se a validação na aplicação falhar:
            const message = error.details[0].message;
            res.status(400).json(message) // TODO traduzir essas mensagens
        }else{ // a validação na aplicação deu certo, falta a do MongoDB:
            try{
                await usuarioServices.deleteUsuario(value)
                res.status(201).json("Usuário deletado com sucesso") // TODO dto
            }catch(error: any){ // se o MongoDB rejeitar
                if (error instanceof ResponseError){
                    res.status(error.codigoResposta).json(error.message)
                }else{
                    res.status(500).send()
                }
            }
            
        }
    }



}

export const UsuarioController = new usuarioController()
