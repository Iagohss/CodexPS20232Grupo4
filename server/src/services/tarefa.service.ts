import { Tarefa } from "../models/tarefa";
import { Usuario } from '../models/usuario';

import { validaUsuarioESenha } from "../utils/usuario.utils";

import { GetTarefaDTO } from "../dto/tarefa/getTarefa.dto";
import { PostTarefaDTO } from "../dto/tarefa/postTarefa.dto";
import { CreateTarefaDTO } from "../dto/tarefa/createTarefa.dto";
import { ReturnTarefaDTO } from "../dto/tarefa/returnTarefa.dto";

import { MongoServerError } from 'mongodb';
import { DatabaseError } from '../errors/databaseError'
import { ResponseError } from "../errors/ResponseError";
import { TarefaNaoPodeSerCriadaError } from "../errors/tarefas/tarefaNaoPodeSerCriadaError";
import { UsuarioNaoExisteError } from "../errors/usuario/usuarioNaoExisteError";
import { GetTarefasEmailDTO } from "../dto/tarefa/getTarefasEmail.dto";
import { TarefaNaoExisteError } from "../errors/tarefas/tarefaNaoExisteError";
import { PutTarefaDTO } from "../dto/tarefa/putTarefa.dto";
import { TarefaNaoPodeSerModificadaError } from "../errors/tarefas/tarefaNaoPodeSerModificadaError";
import { DeleteTarefaDTO } from "../dto/tarefa/deleteTarefa.dto";


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

            await validaUsuarioESenha(getTarefaDTO.data.usuarioEmail, getTarefaDTO.data.usuarioSenha)

            const tarefa = await Tarefa.findOne({_id: getTarefaDTO.data.tarefaID, usuarioEmail: getTarefaDTO.data.usuarioEmail})

            if (!tarefa){ throw new TarefaNaoExisteError()}

            return ReturnTarefaDTO.criarComTarefa(tarefa)


        }catch(error: any){
            if (error instanceof ResponseError){
                throw error
            }else{
                throw new DatabaseError(error.message)
            }
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

    // PUT
    async putTarefa(data:any){
        try{
            const putTarefaDTO = new PutTarefaDTO(data)

            await validaUsuarioESenha(putTarefaDTO.data.usuarioEmail, putTarefaDTO.data.usuarioSenha)

            const updateTarefa = await Tarefa.findOneAndUpdate(
                { _id: putTarefaDTO.data.tarefaID, usuarioEmail: putTarefaDTO.data.usuarioEmail },
                {
                  titulo: putTarefaDTO.data.titulo,
                  descricao: putTarefaDTO.data.descricao,
                  dataAdicionada: putTarefaDTO.data.dataAdicionada,
                  dataLimite: putTarefaDTO.data.dataLimite,
                  dataConclusao: putTarefaDTO.data.dataConclusao
                },
                { new: true }
              );
              
              if (!updateTarefa) {
                throw new TarefaNaoExisteError();
              }
              
              return ReturnTarefaDTO.criarComTarefa(updateTarefa);


    }catch(error: any){
        if (error instanceof ResponseError){
            throw error
        }else{
            throw new DatabaseError(error.message)
        }
    }

  }

  // DELETE
  async deleteTarefa(data: any){
    try{
        const deleteTarefaDTO = new DeleteTarefaDTO(data)

        await validaUsuarioESenha(deleteTarefaDTO.data.usuarioEmail, deleteTarefaDTO.data.usuarioSenha)

        const tarefa = await Tarefa.findOneAndDelete({_id: deleteTarefaDTO.data.tarefaID, usuarioEmail: deleteTarefaDTO.data.usuarioEmail})

        if (!tarefa){
            throw new TarefaNaoExisteError()
        }
    }catch(error: any){
        if (error instanceof ResponseError){
            throw error
        }else{
            throw new DatabaseError(error.message)
        }
    }
  }

}
export const tarefaServices = new tarefaService()