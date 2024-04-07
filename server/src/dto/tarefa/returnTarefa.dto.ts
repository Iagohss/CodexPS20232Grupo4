import Joi from 'joi';

const returnTarefaSchema = Joi.object({
    usuarioEmail: Joi.string().email().required(),
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataAdicionada: Joi.date().required(),
    dataLimite: Joi.date().required(),
    dataConclusao: Joi.date()
});

interface IReturnTarefaDTO {
    usuarioEmail: string;
    titulo: string;
    descricao: string;
    dataAdicionada: Date;
    dataLimite: Date;
    dataConclusao: Date;
}

export class ReturnTarefaDTO {
    private _data: IReturnTarefaDTO;

    constructor(tarefaData: IReturnTarefaDTO) {
        this._data = tarefaData;
    }

    get data(): IReturnTarefaDTO {
        return this._data;
    }

    static criarComTarefa(novaTarefa: any): ReturnTarefaDTO {
        const tarefaData: IReturnTarefaDTO = {
            usuarioEmail: novaTarefa.usuarioEmail,
            titulo: novaTarefa.titulo,
            descricao: novaTarefa.descricao,
            dataAdicionada: novaTarefa.dataAdicionada,
            dataLimite: novaTarefa.dataLimite,
            dataConclusao: novaTarefa.dataConclusao,
        };
        return new ReturnTarefaDTO(tarefaData);
    }
}
