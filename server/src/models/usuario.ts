import {Schema, model} from 'mongoose';
import Joi from 'joi';

export const usuarioSchemaValidate = Joi.object({
    email: Joi.string().email().required(),
    primeiroNome: Joi.string().required(),
    restoNome: Joi.string().required(),
    dataNascimento: Joi.date().required(),
    genero: Joi.string().required(),
    senha: Joi.string().required()
});

export interface IUsuarios{
    email: string,
    primeiroNome: string,
    restoNome: string,
    dataNascimento: Date,
    genero: string,
    senha: string
}

const usuarioSchema = new Schema<IUsuarios>({
    email: { type: String, required: true, unique: true },
    primeiroNome: { type: String, required: true },
    restoNome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    genero: { type: String, required: true },
    senha: { type: String, required: true }
});

export const Usuario = model<IUsuarios>('Usuario', usuarioSchema);