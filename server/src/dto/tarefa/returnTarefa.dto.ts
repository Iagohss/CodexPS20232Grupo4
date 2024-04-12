import Joi from 'joi';

export const returnTarefaSchema = Joi.object({
    id: Joi.string().required(),
    usuarioEmail: Joi.string().email().required(),
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataAdicionada: Joi.date().required(),
    dataLimite: Joi.date().required(),
    dataConclusao: Joi.date()
});

interface IReturnTarefaDTO {
    id: string;
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
            id: novaTarefa.id,
            usuarioEmail: novaTarefa.usuarioEmail,
            titulo: novaTarefa.titulo,
            descricao: novaTarefa.descricao,
            dataAdicionada: novaTarefa.dataAdicionada,
            dataLimite: novaTarefa.dataLimite,
            dataConclusao: novaTarefa.dataConclusao,
        };
        return new ReturnTarefaDTO(tarefaData);
    }

    static criarComTarefas(tarefas: any[]): ReturnTarefaDTO[] {
        return tarefas.map(tarefa => ReturnTarefaDTO.criarComTarefa(tarefa));
    }
}
