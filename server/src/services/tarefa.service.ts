import { Tarefa } from "../models/tarefa";
import { Usuario } from '../models/usuario';

import { validaUsuarioESenha } from "../utils/usuario.utils";

import { GetTarefaDTO } from "../dto/tarefa/getTarefa.dto";
import { PostTarefaDTO } from "../dto/tarefa/postTarefa.dto";
import { CreateTarefaDTO } from "../dto/tarefa/createTarefa.dto";
import { ReturnTarefaDTO } from "../dto/tarefa/returnTarefa.dto";

import { MongoServerError } from 'mongodb';
import {DatabaseError} from '../errors/databaseError'
import { ResponseError } from "../errors/ResponseError";
import { TarefaNaoPodeSerCriadaError } from "../errors/tarefas/tarefaNaoPodeSerCriadaError";
import { UsuarioNaoExisteError } from "../errors/usuario/usuarioNaoExisteError";
import { GetTarefasEmailDTO } from "../dto/tarefa/getTarefasEmail.dto";


export class tarefaService{

    // GET ALL
    async getTarefas(){
        try{
            const tarefas = await Tarefa.find({})

            const tarefasDTO = ReturnTarefaDTO.criarComTarefas(tarefas)

            return tarefasDTO
        }catch (error: any){
            throw new DatabaseError(error.message)
        }
    }

    // GET ALL EMAIL
    async getTarefasEmail(usuarioEmail: string, usuarioSenha: string){
        try{
            await validaUsuarioESenha(usuarioEmail, usuarioSenha)
            const tarefas = await Tarefa.find({usuarioEmail: usuarioEmail})

            const tarefasDTO = ReturnTarefaDTO.criarComTarefas(tarefas)

            return tarefasDTO

        }catch(error: any){
            if (error instanceof ResponseError){
                throw error
            }else{
                throw new DatabaseError(error.message)
            }

        }

    }    
    // GET ID
    async getTarefa(data: any){ // TODO 
        try{
            const getTarefaDTO = new GetTarefaDTO(data)
        }catch(error: any){
        
        }
    }

    // POST
    async postTarefa(data: any){
        try{
            const postTarefaDTO = new PostTarefaDTO(data)

            const usuario = await Usuario.findOne({email: postTarefaDTO.data.usuarioEmail})

            if (!usuario) {throw new UsuarioNaoExisteError()}

            if (usuario.senha !== postTarefaDTO.data.usuarioSenha){
                throw new TarefaNaoPodeSerCriadaError("Senha do usuário inválida.")
            }

            const createTarefaDTO = CreateTarefaDTO.criarComPostTarefaDTO(postTarefaDTO)
            const novaTarefa = await Tarefa.create(createTarefaDTO.data)

            return ReturnTarefaDTO.criarComTarefa(novaTarefa)
            
        }catch (error: any){
            if (error instanceof MongoServerError){ // Bloco referente aos erros que podem ser jogados pelo MongoDB
                if (error.code == 11000){
                    const message = {message: `Usuário não pôde ser criado.`, valores: error.keyValue}
                    throw new TarefaNaoPodeSerCriadaError(JSON.stringify(message))
                }else{ //TODO: os outros códigos do MongoServerError para não lançar apenas um DatabaseError
                    throw new DatabaseError(error.message)
                }
            }else{ // 
                throw error
            }
        }
    }

}
export const tarefaServices = new tarefaService()