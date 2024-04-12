import { TTarefa, _dataTarefas } from "./types";

/* export async function doGETALLtarefa(autentication : Autentication): Promise<TTarefa[]> {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas/email/${autentication.usuarioEmail}`, {
    method: "GET",
    body: JSON.stringify(
      autentication
    ),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const saida : _dataTarefas[] = await response.json();
  return saida.map(res => { return res._data})
} */

export async function doGETALLtarefa(): Promise<TTarefa[]> {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas`);
  const saida : _dataTarefas[] = await response.json();
  return saida.map(res => { return res._data})
}