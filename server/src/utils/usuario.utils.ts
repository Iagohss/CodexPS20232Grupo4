import { IUsuarios, Usuario } from '../models/usuario';
import { Tarefa } from '../models/tarefa';

import { UsuarioNaoExisteError } from '../errors/usuario/usuarioNaoExisteError';
import { UsuarioSenhaErradaError } from '../errors/usuario/usuarioSenhaErradaError';

/**
 * Valida o usuário e a senha. Lança erros se o usuário não existir ou se a senha estiver errada.
 * 
 * @param usuarioEmail 
 * @param usuarioSenha 
 * @returns {Promise<IUsuarios>} Usuário como um Document do Mongoose
 * @throws UsuarioNaoExisteError
 * @throws UsuarioSenhaErradaError
 */
export async function validaUsuarioESenha(usuarioEmail: string, usuarioSenha: string): Promise<IUsuarios>{
    const usuario = await Usuario.findOne({email: usuarioEmail})
    if (!usuario) {throw new UsuarioNaoExisteError()}

    if (usuario.senha !== usuarioSenha){ throw new UsuarioSenhaErradaError()} 

    return usuario
}

/**
 * Deleta todas as tarefas de um usuário. Assume que o usuário está validado.
 * 
 * @param usuarioEmail 
 */
export async function deletaTodasTarefasUsuario(usuarioEmail: string) {

    await Tarefa.deleteMany({usuarioEmail: usuarioEmail})

}
    