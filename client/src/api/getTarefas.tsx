export type TTarefa = {
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao: Date
};

type TGetTarefas = {
  _data : TTarefa
}

export async function getTarefas(): Promise<TTarefa[]> {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas`);
  const saida : TGetTarefas[] = await response.json();
  return saida.map(res => { return res._data})
}