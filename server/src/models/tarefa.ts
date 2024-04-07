import {Schema, model} from 'mongoose';
import Joi from 'joi';

export const tarefaSchemaValidate = Joi.object({
    usuarioEmail: Joi.string().required(),
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataAdicionada: Joi.date().required(),
    dataLimite: Joi.date().required(),
    dataConclusao: Joi.date()
});

interface ITarefas{
    usuarioEmail: string,
    titulo: string,
    descricao: string,
    dataAdicionada: Date,
    dataLimite: Date,
    dataConclusao: Date
}

const tarefaSchema = new Schema<ITarefas>({
    usuarioEmail: { type: String, required: true },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataAdicionada: { type: Date, required: true },
    dataLimite: { type: Date, required: true },
    dataConclusao: { type: Date }
});

export const Tarefa = model<ITarefas>('Tarefa', tarefaSchema);
