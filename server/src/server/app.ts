import express from 'express'
const cors = require('cors');
import { db} from '../config/db.config'
import { usuarioRouter } from '../routes/usuario.routes'
import { tarefaRouter } from '../routes/tarefa.routes'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// Routes
app.use('/api/v1/usuarios', usuarioRouter)
app.use('/api/v1/tarefas', tarefaRouter)

const porta = process.env.PORT

db.then(() => {
    app.listen(porta, () => console.log(`Servidor monitorando a porta ${porta}.`))
})