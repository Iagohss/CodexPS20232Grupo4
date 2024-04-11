import { Tarefa } from "../../models/tarefa"

export async function addTarefas(usuarioEmail: string, numTarefas: number){
    const tarefas = []

    for (let i = 1; i <= numTarefas; i++){
        const tarefa = {
            usuarioEmail: usuarioEmail,
            titulo: `Tarefa ${i}`,
            descricao: `Descrição da tarefa ${i}`,
            dataAdicionada: new Date(),
            dataLimite: new Date(),
            dataConclusao: i % 2 === 0 ? new Date() : undefined
        }

        tarefa.dataAdicionada.setDate(tarefa.dataAdicionada.getDate() + i)
        tarefa.dataLimite.setDate(tarefa.dataLimite.getDate() + i)

        tarefas.push(tarefa)
    }

    await Tarefa.create(tarefas)

    return tarefas
}