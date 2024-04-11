import { DadosComSenha, _dataTarefas, TTarefa } from "./types";

export async function doPUTtarefa(dadosComSenha : DadosComSenha) : Promise<TTarefa>{
  const response = await fetch(`http://localhost:5000/api/v1/tarefas/${dadosComSenha.id}`, {
    method: "PUT",
    body: JSON.stringify(
      dadosComSenha
    ),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const saida : _dataTarefas = await response.json();
  return saida._data;
}