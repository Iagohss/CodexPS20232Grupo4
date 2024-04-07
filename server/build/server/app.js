"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("../config/db.config");
const usuario_routes_1 = require("../routes/usuario.routes");
const tarefa_routes_1 = require("../routes/tarefa.routes");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Lidando com o CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methoeds', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// Routes
app.use('/api/v1/usuarios', usuario_routes_1.usuarioRouter);
app.use('/api/v1/tarefas', tarefa_routes_1.tarefaRouter);
const porta = process.env.PORT;
db_config_1.db.then(() => {
    app.listen(porta, () => console.log(`Servidor monitorando a porta ${porta}.`));
});
