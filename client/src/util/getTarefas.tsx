import { Autentication, TTarefa, _dataTarefas } from "./types";

export async function doGETALLtarefa(
  autentication: Autentication
): Promise<TTarefa[]> {
  const response = await fetch(
    `http://localhost:5000/api/v1/tarefas/email/${autentication.usuarioEmail}/${autentication.usuarioSenha}`
  );
  const saida: _dataTarefas[] = await response.json();
  return saida.map((res) => {
    return res._data;
  });
}
