import { DadosComSenha, _dataTarefas, TTarefa } from "./types";

export async function doPUTtarefa(
  dadosComSenha: DadosComSenha
): Promise<TTarefa> {
  const response = await fetch(
    `https://codexps20232grupo4-2.onrender.com/api/v1/tarefas/${dadosComSenha.id}`,
    {
      method: "PUT",
      body: JSON.stringify(dadosComSenha),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const saida: _dataTarefas = await response.json();
  return saida._data;
}
