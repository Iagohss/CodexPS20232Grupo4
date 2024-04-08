import {Request, Response} from 'express'

import { tarefaServices } from '../services/tarefa.service'

import { createTarefaSchema } from '../dto/tarefa/createTarefa.dto'

import {ResponseError} from '../errors/ResponseError'
import { postTarefaSchema } from '../dto/tarefa/postTarefa.dto'
import { ValidationError } from 'joi'
import { getTarefasEmailSchema } from '../dto/tarefa/getTarefasEmail.dto'


class tarefaController{

    // GET ALL
    getTarefas = async (req: Request, res: Response) => {
        try{
            const tarefas = await tarefaServices.getTarefas()
            res.send(tarefas)
        }catch(error: any){
            if (error instanceof ResponseError){
                res.status(error.codigoResposta).json(error.message);
            }else{
                res.status(500).json("Erro no servidor")
            }
        }
    }

    // GET ALL EMAIL
    getTarefasEmail = async (req: Request, res: Response) => {
        try{
            const dados = {
                usuarioSenha: req.body.usuarioSenha
            }

            const {error, value} = getTarefasEmailSchema.validate(dados)

            if (error){ // se a validação na aplicação falhar:
                const message = error.details.map(detail => detail.message);
                res.status(400).json(message)
            }else{ // a validação na aplicação deu certo, falta a do MongoDB:
                const tarefas = await tarefaServices.getTarefasEmail(req.params.usuarioEmail, value.usuarioSenha)
                res.status(201).send(tarefas)
            }
        }catch(error: any){
            if (error instanceof ResponseError){
                res.status(error.codigoResposta).json(error.message)
            }else{
                res.status(500).json("Erro no servidor")
            
            }
        }
    }

    // POST
    postTarefa = async(req: Request, res: Response) =>{
        const dadosSemSenha = {
            usuarioEmail: req.body.usuarioEmail,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            dataAdicionada: req.body.dataAdicionada,
            dataLimite: req.body.dataLimite,
            dataConclusao: req.body.dataConclusao
        };
        // TODO: REFACTOR. Complexidade desnecessária.
        const dadosComSenha = {...dadosSemSenha, usuarioSenha : req.body.usuarioSenha}

        const {error: error1, value: valueComSenha} = postTarefaSchema.validate(dadosComSenha)

        const {error: error2, value: valueSemSenha} = createTarefaSchema.validate(dadosSemSenha)

        if (error1 || error2){ // se a validação na aplicação falhar:
            const error: ValidationError = (error1 ? error1 : error2) as ValidationError
            const message = error.details.map(detail => detail.message);
            res.status(400).send(message) // TODO traduzir essas mensagens
        }else{ // a validação na aplicação deu certo, falta a do MongoDB:
            try{
                const tarefa = await tarefaServices.postTarefa(valueComSenha)
                res.status(201).send(tarefa)
            }catch (error: any){
                if (error instanceof ResponseError){
                    res.status(error.codigoResposta).json(error.message)
                }else{
                    res.status(500).json("Erro no servidor")
                }
            }

        }

    }

}

export const TarefaController = new tarefaController()