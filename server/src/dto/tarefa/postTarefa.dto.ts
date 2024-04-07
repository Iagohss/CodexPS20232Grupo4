import Joi from 'joi';

/*
Diferente de createTarefaDTO pois esse se trata do DTO da requisição POST, incluindo a senha do usuário.
*/

export const postTarefaSchema = Joi.object({
    usuarioEmail: Joi.string().email().required(),
    usuarioSenha: Joi.string().required(),
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataAdicionada: Joi.date().required(),
    dataLimite: Joi.date().required(),
    dataConclusao: Joi.date()
});

interface IPostTarefaDTO {
    usuarioEmail: string;
    usuarioSenha: string;
    titulo: string;
    descricao: string;
    dataAdicionada: Date;
    dataLimite: Date;
    dataConclusao: Date;
}

export class PostTarefaDTO {
    private _data: IPostTarefaDTO;

    constructor(tarefaData: IPostTarefaDTO) {
        this._data = tarefaData;
    }

    get data(): IPostTarefaDTO {
        return this._data;
    }
  }
