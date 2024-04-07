"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRouter = void 0;
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../controllers/usuario.controller");
exports.usuarioRouter = express_1.default.Router();
// GET ALL
exports.usuarioRouter.get('/', usuario_controller_1.UsuarioController.getUsuarios);
// GET EMAIL
exports.usuarioRouter.get('/:email', usuario_controller_1.UsuarioController.getUsuario);
// POST
exports.usuarioRouter.post('/', usuario_controller_1.UsuarioController.postUsuario);
// PUT
exports.usuarioRouter.put('/:email', usuario_controller_1.UsuarioController.putUsuario);
// DELETE
exports.usuarioRouter.delete('/:email', usuario_controller_1.UsuarioController.deleteUsuario);
