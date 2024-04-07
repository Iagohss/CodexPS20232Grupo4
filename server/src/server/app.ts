import express from 'express'
import { db} from '../config/db.config'
import { usuarioRouter } from '../routes/usuario.routes'
import { tarefaRouter } from '../routes/tarefa.routes'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Lidando com o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');

  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methoeds', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/api/v1/usuarios', usuarioRouter)
app.use('/api/v1/tarefas', tarefaRouter)

const porta = process.env.PORT

db.then(() => {
    app.listen(porta, () => console.log(`Servidor monitorando a porta ${porta}.`))
})