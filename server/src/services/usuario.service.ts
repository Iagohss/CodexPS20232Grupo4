import {Usuario} from '../models/usuario';

import { PostUsuarioDTO } from '../dto/usuario/postUsuario.dto';
import { ReturnUsuarioDTO } from '../dto/usuario/returnUsuario.dto';
import { PutUsuarioDTO } from '../dto/usuario/putUsuario.dto';
import { DeleteUsuarioDTO } from '../dto/usuario/deleteUsuario.dto';

import { MongoServerError } from 'mongodb';
import {UsuarioNaoExisteError} from '../errors/usuario/usuarioNaoExisteError'
import {DatabaseError} from '../errors/databaseError'
import { UsuarioNaoPodeSerCriadoError } from '../errors/usuario/usuarioNaoPodeSerCriadoError';
import { UsuarioNaoPodeSerModificadoError } from '../errors/usuario/usuarioNaoPodeSerModificadoError';
import { UsuarioNaoPodeSerDeletadoError } from '../errors/usuario/usuarioNaoPodeSerDeletadoError';
import { ResponseError } from '../errors/ResponseError';
import { deletaTodasTarefasUsuario } from '../utils/usuario.utils';

export class usuarioService{
    
    // GET ALL
    async getUsuarios(){
        try{
            const usuarios = await Usuario.find({})

            const usuariosDTO: ReturnUsuarioDTO[] = usuarios.map(usuario => {
                return ReturnUsuarioDTO.criarComUsuario(usuario)
            })
    
            return usuariosDTO
        }catch(error: any){
            throw new DatabaseError(error.message)
        }
        
    }

    // GET EMAIL
    async getUsuario(usuarioEmail: string){
        const usuario = await Usuario.findOne({email: usuarioEmail})

        if (!usuario){throw new UsuarioNaoExisteError()}

        const retornaUsuarioDTO = ReturnUsuarioDTO.criarComUsuario(usuario);
        return retornaUsuarioDTO
    }

    // POST
    async postUsuario(data: any){
        try{
            const postUsuarioDTO = new PostUsuarioDTO(data)
            const novoUsuario = await Usuario.create(postUsuarioDTO.data)

            const retornaUsuarioDTO = ReturnUsuarioDTO.criarComUsuario(novoUsuario)
            return retornaUsuarioDTO

        }catch(error: any){
            if (error instanceof MongoServerError){
                if (error.code === 11000){
                    const message = {message: `Usuário não pôde ser criado.`, valores: error.keyValue}
                    throw new UsuarioNaoPodeSerCriadoError(JSON.stringify(message))
                }else{ //TODO: os outros códigos do MongoServerError para não lançar apenas um DatabaseError
                    throw new DatabaseError(error.message)
                }
            }else{
                throw new DatabaseError(error.message)
            }
        }
    }
    // PUT
    async putUsuario(data: any){
        try{
            const updateUsuarioDTO = new PutUsuarioDTO(data)

            const usuario = await Usuario.findOne({email: updateUsuarioDTO.data.email})

            if (!usuario){throw new UsuarioNaoExisteError()}

            if (usuario.senha !== updateUsuarioDTO.data.senhaAntiga){
                throw new UsuarioNaoPodeSerModificadoError("Senha do usuário inválida.")
            }

            const updateUsuario = await Usuario.findOneAndUpdate(
            { email: updateUsuarioDTO.data.email }, 
            {
                primeiroNome: updateUsuarioDTO.data.primeiroNome,
                restoNome: updateUsuarioDTO.data.restoNome,
                dataNascimento: updateUsuarioDTO.data.dataNascimento,
                genero: updateUsuarioDTO.data.genero,
                senha: updateUsuarioDTO.data.senhaNova
            },
            {new: true}
        );

            return ReturnUsuarioDTO.criarComUsuario(updateUsuario)

        }catch(error: any){
            if (error instanceof ResponseError){
                throw error
            }else{
                throw new UsuarioNaoPodeSerModificadoError(error.message)
            }
        }
    }

    // DELETE
    async deleteUsuario(data: any){
        try{
            const deleteUsuarioDTO = new DeleteUsuarioDTO(data)

            const usuario = await Usuario.findOne({email: deleteUsuarioDTO.data.email})

            if (!usuario){throw new UsuarioNaoExisteError()}

            if (usuario.senha !== deleteUsuarioDTO.data.senha){
                throw new UsuarioNaoPodeSerDeletadoError("Senha do usuário inválida.")
            }

            await Usuario.deleteOne({email: deleteUsuarioDTO.data.email})

            await deletaTodasTarefasUsuario(deleteUsuarioDTO.data.email)

        }catch(error: any){
            if (error instanceof ResponseError){ // Erros lançados no próprio bloco try
                throw error
            }
            if (error instanceof MongoServerError){ // Bloco referente aos erros que podem ser jogados pelo MongoDB
                const message = {message: `Usuário não pôde ser deletado.`, valores: error.keyValue};
                throw new UsuarioNaoPodeSerDeletadoError(JSON.stringify(message))
            }else{
                throw new DatabaseError(error.message)
            }
        }
    }

}
export const usuarioServices = new usuarioService()