"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioServices = exports.usuarioService = void 0;
const usuario_1 = require("../models/usuario");
const postUsuario_dto_1 = require("../dto/usuario/postUsuario.dto");
const returnUsuario_dto_1 = require("../dto/usuario/returnUsuario.dto");
const putUsuario_dto_1 = require("../dto/usuario/putUsuario.dto");
const deleteUsuario_dto_1 = require("../dto/usuario/deleteUsuario.dto");
const mongodb_1 = require("mongodb");
const usuarioNaoExisteError_1 = require("../errors/usuario/usuarioNaoExisteError");
const databaseError_1 = require("../errors/databaseError");
const usuarioNaoPodeSerCriadoError_1 = require("../errors/usuario/usuarioNaoPodeSerCriadoError");
const usuarioNaoPodeSerModificadoError_1 = require("../errors/usuario/usuarioNaoPodeSerModificadoError");
const usuarioNaoPodeSerDeletadoError_1 = require("../errors/usuario/usuarioNaoPodeSerDeletadoError");
const ResponseError_1 = require("../errors/ResponseError");
class usuarioService {
    // GET ALL
    getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuario_1.Usuario.find({});
                const usuariosDTO = usuarios.map(usuario => {
                    return returnUsuario_dto_1.ReturnUsuarioDTO.criarComUsuario(usuario);
                });
                return usuariosDTO;
            }
            catch (error) {
                throw new databaseError_1.DatabaseError(error.message);
            }
        });
    }
    // GET EMAIL
    getUsuario(usuarioEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.Usuario.findOne({ email: usuarioEmail });
            if (!usuario) {
                throw new usuarioNaoExisteError_1.UsuarioNaoExisteError();
            }
            const retornaUsuarioDTO = returnUsuario_dto_1.ReturnUsuarioDTO.criarComUsuario(usuario);
            return retornaUsuarioDTO;
        });
    }
    // POST
    postUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postUsuarioDTO = new postUsuario_dto_1.PostUsuarioDTO(data);
                const novoUsuario = yield usuario_1.Usuario.create(postUsuarioDTO.data);
                const retornaUsuarioDTO = returnUsuario_dto_1.ReturnUsuarioDTO.criarComUsuario(novoUsuario);
                return retornaUsuarioDTO;
            }
            catch (error) {
                if (error instanceof mongodb_1.MongoServerError) {
                    if (error.code === 11000) {
                        const message = { message: `Usuário não pôde ser criado.`, valores: error.keyValue };
                        throw new usuarioNaoPodeSerCriadoError_1.UsuarioNaoPodeSerCriadoError(JSON.stringify(message));
                    }
                    else { //TODO: os outros códigos do MongoServerError para não lançar apenas um DatabaseError
                        throw new databaseError_1.DatabaseError(error.message);
                    }
                }
                else {
                    throw new databaseError_1.DatabaseError(error.message);
                }
            }
        });
    }
    // PUT
    putUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUsuarioDTO = new putUsuario_dto_1.PutUsuarioDTO(data);
                const usuario = yield usuario_1.Usuario.findOne({ email: updateUsuarioDTO.data.email });
                if (!usuario) {
                    throw new usuarioNaoExisteError_1.UsuarioNaoExisteError();
                }
                if (usuario.senha !== updateUsuarioDTO.data.senhaAntiga) {
                    throw new usuarioNaoPodeSerModificadoError_1.UsuarioNaoPodeSerModificadoError("Senha do usuário inválida.");
                }
                const updateUsuario = yield usuario_1.Usuario.updateOne({ email: updateUsuarioDTO.data.email }, {
                    email: updateUsuarioDTO.data.email,
                    primeiroNome: updateUsuarioDTO.data.primeiroNome,
                    restoNome: updateUsuarioDTO.data.restoNome,
                    dataNascimento: updateUsuarioDTO.data.dataNascimento,
                    genero: updateUsuarioDTO.data.genero,
                    senha: updateUsuarioDTO.data.senhaNova
                });
                // TODO: o updateUsuario vem vazio por alguma razão? Talvez não seja necessário fazer o this.getUsuario abaixo
                return this.getUsuario(updateUsuarioDTO.data.email);
            }
            catch (error) {
                throw new usuarioNaoPodeSerModificadoError_1.UsuarioNaoPodeSerModificadoError(error.message);
            }
        });
    }
    // DELETE
    deleteUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUsuarioDTO = new deleteUsuario_dto_1.DeleteUsuarioDTO(data);
                const usuario = yield usuario_1.Usuario.findOne({ email: deleteUsuarioDTO.data.email });
                if (!usuario) {
                    throw new usuarioNaoExisteError_1.UsuarioNaoExisteError();
                }
                if (usuario.senha !== deleteUsuarioDTO.data.senha) {
                    throw new usuarioNaoPodeSerDeletadoError_1.UsuarioNaoPodeSerDeletadoError("Senha do usuário inválida.");
                }
                yield usuario_1.Usuario.deleteOne({ email: deleteUsuarioDTO.data.email });
            }
            catch (error) {
                if (error instanceof ResponseError_1.ResponseError) { // Encapsulando a situação da senha estar errada
                    throw error;
                }
                if (error instanceof mongodb_1.MongoServerError) { // Bloco referente aos erros que podem ser jogados pelo MongoDB
                    if (error.code === 11000) {
                        const message = { message: `Usuário não pôde ser criado.`, valores: error.keyValue };
                        throw new usuarioNaoPodeSerCriadoError_1.UsuarioNaoPodeSerCriadoError(JSON.stringify(message));
                    }
                    else { //TODO: os outros códigos do MongoServerError para não lançar apenas um DatabaseError
                        throw new databaseError_1.DatabaseError(error.message);
                    }
                }
                else {
                    throw new databaseError_1.DatabaseError(error.message);
                }
            }
        });
    }
}
exports.usuarioService = usuarioService;
exports.usuarioServices = new usuarioService();
