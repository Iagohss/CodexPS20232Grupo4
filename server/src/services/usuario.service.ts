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

/**
 * Service de Usuário.
 */
export class usuarioService {
    
    /**
     * Retorna todos os usuários.
     * @returns Uma Promise para um array de DTOs de usuários.
     * @throws {DatabaseError} Se houver um erro ao buscar os usuários no banco de dados.
     */
    async getUsuarios() {
        try {
            // Recupera todos os usuários do banco de dados
            const usuarios = await Usuario.find({});

            // Mapeia os usuários para DTOs de usuários
            const usuariosDTO: ReturnUsuarioDTO[] = usuarios.map(usuario => {
                return ReturnUsuarioDTO.criarComUsuario(usuario);
            });

            return usuariosDTO;
        } catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    /**
     * Recupera um usuário pelo email.
     * @param usuarioEmail - O email do usuário a ser recuperado.
     * @returns Uma Promise para o DTO do usuário.
     * @throws {UsuarioNaoExisteError} Se o usuário não existir.
     */
    async getUsuario(usuarioEmail: string) {
        const usuario = await Usuario.findOne({ email: usuarioEmail });

        if (!usuario) {
            throw new UsuarioNaoExisteError();
        }

        const retornaUsuarioDTO = ReturnUsuarioDTO.criarComUsuario(usuario);
        return retornaUsuarioDTO;
    }

    /**
     * Cria um novo usuário.
     * @param data - Os dados para criar o usuário.
     * @returns Uma Promise para o DTO do usuário criado.
     * @throws {UsuarioNaoPodeSerCriadoError} Se o usuário não puder ser criado.
     * @throws {DatabaseError} Se houver um erro ao criar o usuário no banco de dados.
     */
    async postUsuario(data: any) {
        try {
            const postUsuarioDTO = new PostUsuarioDTO(data);
            const novoUsuario = await Usuario.create(postUsuarioDTO.data);

            const retornaUsuarioDTO = ReturnUsuarioDTO.criarComUsuario(novoUsuario);
            return retornaUsuarioDTO;
        } catch (error: any) {
            if (error instanceof MongoServerError) {
                if (error.code === 11000) {
                    const message = { message: `Usuário não pôde ser criado.`, valores: error.keyValue };
                    throw new UsuarioNaoPodeSerCriadoError(JSON.stringify(message));
                } else {
                    throw new DatabaseError(error.message);
                }
            } else {
                throw new DatabaseError(error.message);
            }
        }
    }

    /**
     * Atualiza um usuário.
     * @param data - Os dados para atualizar o usuário.
     * @returns Uma Promise para o DTO do usuário atualizado.
     * @throws {UsuarioNaoExisteError} Se o usuário não existir.
     * @throws {UsuarioNaoPodeSerModificadoError} Se o usuário não puder ser atualizado.
     */
    async putUsuario(data: any) {
        try {
            const updateUsuarioDTO = new PutUsuarioDTO(data);

            const usuario = await Usuario.findOne({ email: updateUsuarioDTO.data.email });

            if (!usuario) {
                throw new UsuarioNaoExisteError();
            }

            if (usuario.senha !== updateUsuarioDTO.data.senhaAntiga) {
                throw new UsuarioNaoPodeSerModificadoError("Senha do usuário inválida.");
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
                { new: true }
            );

            return ReturnUsuarioDTO.criarComUsuario(updateUsuario);
        } catch (error: any) {
            if (error instanceof ResponseError) {
                throw error;
            } else {
                throw new UsuarioNaoPodeSerModificadoError(error.message);
            }
        }
    }

    /**
     * Deleta um usuário.
     * @param data - Os dados para deletar o usuário.
     * @throws {UsuarioNaoExisteError} Se o usuário não existir.
     * @throws {UsuarioNaoPodeSerDeletadoError} Se o usuário não puder ser deletado.
     * @throws {DatabaseError} Se houver um erro ao deletar o usuário do banco de dados.
     */
    async deleteUsuario(data: any) {
        try {
            const deleteUsuarioDTO = new DeleteUsuarioDTO(data);

            const usuario = await Usuario.findOne({ email: deleteUsuarioDTO.data.email });

            if (!usuario) {
                throw new UsuarioNaoExisteError();
            }

            if (usuario.senha !== deleteUsuarioDTO.data.senha) {
                throw new UsuarioNaoPodeSerDeletadoError("Senha do usuário inválida.");
            }

            await Usuario.deleteOne({ email: deleteUsuarioDTO.data.email });

            await deletaTodasTarefasUsuario(deleteUsuarioDTO.data.email);
        } catch (error: any) {
            if (error instanceof ResponseError) {
                throw error;
            }
            if (error instanceof MongoServerError) {
                const message = { message: `Usuário não pôde ser deletado.`, valores: error.keyValue };
                throw new UsuarioNaoPodeSerDeletadoError(JSON.stringify(message));
            } else {
                throw new DatabaseError(error.message);
            }
        }
    }
}
export const usuarioServices = new usuarioService()
