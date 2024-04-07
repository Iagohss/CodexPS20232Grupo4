"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const dbConnection = `mongodb+srv://${process.env.DETALHES_CONEXAO}.dmx1tcy.mongodb.net/todolist?retryWrites=true&w=majority&appName=todolist`;
const options = {
    // TODO: modificar essas opções conforme necessário
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
exports.db = mongoose_1.default.connect(dbConnection, options)
    .then(res => {
    if (res) {
        console.log("Conexão com MongoDB realizada com sucesso.");
    }
}).catch(err => {
    console.log(err);
});
