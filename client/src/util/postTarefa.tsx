import { DadosComSenhaNoId, _dataTarefas, TTarefa } from "./types";

export async function doPOSTtarefa(
  dadosComSenha: DadosComSenhaNoId
): Promise<TTarefa> {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas`, {
    method: "POST",
    body: JSON.stringify(dadosComSenha),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const saida: _dataTarefas = await response.json();
  return saida._data;
}
