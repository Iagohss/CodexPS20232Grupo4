import { TTarefa, _dataTarefas } from "./types";

export async function doGETALLtarefa(): Promise<TTarefa[]> {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas`);
  const saida : _dataTarefas[] = await response.json();
  return saida.map(res => { return res._data})
}