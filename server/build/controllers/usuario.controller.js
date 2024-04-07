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
exports.UsuarioController = void 0;
const usuario_service_1 = require("../services/usuario.service");
const usuario_1 = require("../models/usuario");
const putUsuario_dto_1 = require("../dto/usuario/putUsuario.dto");
const deleteUsuario_dto_1 = require("../dto/usuario/deleteUsuario.dto");
const ResponseError_1 = require("../errors/ResponseError");
class usuarioController {
    constructor() {
        // GET ALL
        this.getUsuarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuario_service_1.usuarioServices.getUsuarios();
                res.send(usuarios);
            }
            catch (error) {
                if (error instanceof ResponseError_1.ResponseError) {
                    res.status(error.codigoResposta).json(error.message);
                }
            }
        });
        // GET EMAIL
        this.getUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.email;
                const usuario = yield usuario_service_1.usuarioServices.getUsuario(email);
                res.send(usuario);
            }
            catch (error) {
                if (error instanceof ResponseError_1.ResponseError) {
                    res.status(error.codigoResposta).json(error.message);
                }
                else {
                    res.status(500).send(error.message);
                }
            }
        });
        // POST
        this.postUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dados = {
                email: req.body.email,
                primeiroNome: req.body.primeiroNome,
                restoNome: req.body.restoNome,
                dataNascimento: req.body.dataNascimento,
                genero: req.body.genero,
                senha: req.body.senha
            };
            const { error, value } = usuario_1.usuarioSchemaValidate.validate(dados, { stripUnknown: true });
            if (error) { // se a validação na aplicação falhar:
                const message = error.details.map(detail => detail.message);
                res.status(400).send(message); // TODO traduzir essas mensagens
            }
            else { // a validação na aplicação deu certo, falta a do MongoDB:
                try {
                    const usuario = yield usuario_service_1.usuarioServices.postUsuario(value);
                    res.status(201).send(usuario);
                }
                catch (error) { // se o MongoDB rejeitar
                    if (error instanceof ResponseError_1.ResponseError) {
                        res.status(error.codigoResposta).json(error.message);
                    }
                    else {
                        res.status(500).send();
                    }
                }
            }
        });
        // PUT
        this.putUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dados = {
                email: req.params.email,
                primeiroNome: req.body.primeiroNome,
                restoNome: req.body.restoNome,
                dataNascimento: req.body.dataNascimento,
                genero: req.body.genero,
                senhaAntiga: req.body.senhaAntiga,
                senhaNova: req.body.senhaNova
            };
            const { error, value } = putUsuario_dto_1.putUsuarioSchemaValidate.validate(dados, { stripUnknown: true });
            if (error) { // se a validação na aplicação falhar:
                const message = error.details[0].message;
                res.status(400).send(message); // TODO traduzir essas mensagens
            }
            else { // a validação na aplicação deu certo, falta a do MongoDB:
                try {
                    const usuario = yield usuario_service_1.usuarioServices.putUsuario(value);
                    res.status(201).send(usuario); // TODO dto
                }
                catch (error) { // se o MongoDB rejeitar
                    if (error instanceof ResponseError_1.ResponseError) {
                        res.status(error.codigoResposta).json(error.message);
                    }
                    else {
                        res.status(500).send();
                    }
                }
            }
        });
        // DELETE
        this.deleteUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dados = {
                email: req.params.email,
                senha: req.body.senha
            };
            const { error, value } = deleteUsuario_dto_1.deleteUsuarioSchemaValidate.validate(dados, { stripUnknown: true });
            if (error) { // se a validação na aplicação falhar:
                const message = error.details[0].message;
                res.status(400).json(message); // TODO traduzir essas mensagens
            }
            else { // a validação na aplicação deu certo, falta a do MongoDB:
                try {
                    yield usuario_service_1.usuarioServices.deleteUsuario(value);
                    res.status(201).json("Usuário deletado com sucesso"); // TODO dto
                }
                catch (error) { // se o MongoDB rejeitar
                    if (error instanceof ResponseError_1.ResponseError) {
                        res.status(error.codigoResposta).json(error.message);
                    }
                    else {
                        res.status(500).send();
                    }
                }
            }
        });
    }
}
exports.UsuarioController = new usuarioController();
