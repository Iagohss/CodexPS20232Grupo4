"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tarefaRouter = void 0;
const express_1 = __importDefault(require("express"));
const tarefa_controller_1 = require("../controllers/tarefa.controller");
exports.tarefaRouter = express_1.default.Router();
// GET ALL
exports.tarefaRouter.get('/', tarefa_controller_1.TarefaController.getTarefas);
// GET ID
//usuarioRouter.get('/:id', TarefaController.getTarefa)
// POST
exports.tarefaRouter.post('/', tarefa_controller_1.TarefaController.postTarefa);
// PUT
//usuarioRouter.put('/:id', TarefaController.putTarefa)
// DELETE
//usuarioRouter.delete('/:id', TarefaController.deleteTarefa)
