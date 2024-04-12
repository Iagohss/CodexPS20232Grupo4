import { DadosComSenhaNoId, _dataTarefas, TTarefa } from "./types";

export async function doPOSTtarefa(
  dadosComSenha: DadosComSenhaNoId
): Promise<TTarefa> {
  const response = await fetch(`https://codexps20232grupo4-2.onrender.com/api/v1/tarefas`, {
    method: "POST",
    body: JSON.stringify(dadosComSenha),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const saida: _dataTarefas = await response.json();
  return saida._data;
}
