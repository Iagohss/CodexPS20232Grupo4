import { configuraDB } from "../config/db.config"
import app from "./app"
import dotenv from 'dotenv'

    dotenv.config()

    const uri = `mongodb+srv://${process.env.DETALHES_CONEXAO}.dmx1tcy.mongodb.net/todolist?retryWrites=true&w=majority&appName=todolist`

    configuraDB(uri, true).then(() => {

        const porta = process.env.PORT ? Number(process.env.PORT) : 5000;

        app.listen(porta, () => console.log(`Servidor monitorando a porta ${porta}.`));
    });

